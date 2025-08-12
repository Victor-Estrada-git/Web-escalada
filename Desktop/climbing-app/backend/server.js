const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();

// Importa la configuración de Passport.js
require('./config/passport'); 

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(session({
    secret: 'tu-secreto-de-sesion', // Cambia esto por una clave segura
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Conexión a la base de datos
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado a la base de datos de MongoDB'))
    .catch(err => console.error('Error de conexión a la base de datos:', err));

// Rutas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/dashboard', dashboardRoutes); // <-- Agrega esta línea

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});