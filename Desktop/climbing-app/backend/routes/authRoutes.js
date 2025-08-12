const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Ruta de registro: POST /api/auth/register
router.post('/register', async (req, res) => {
    const { nombre, email, password, rol } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user = new User({ nombre, email, password: hashedPassword, rol });
        await user.save();
        res.status(201).json({ msg: 'Usuario registrado con éxito' });
    } catch (err) {
        res.status(500).send('Error en el servidor');
    }
});

// Ruta de login: POST /api/auth/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }
        const payload = { user: { id: user.id, rol: user.rol } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token, user: { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol } });
        });
    } catch (err) {
        res.status(500).send('Error en el servidor');
    }
});

// Rutas para Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    // Autenticación exitosa, redirige a tu dashboard
    res.redirect('/dashboard');
});

// Rutas para Facebook OAuth
router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
    // Autenticación exitosa, redirige a tu dashboard
    res.redirect('/dashboard');
});

module.exports = router;