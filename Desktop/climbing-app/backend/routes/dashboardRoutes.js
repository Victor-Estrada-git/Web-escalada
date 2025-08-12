const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Routine = require('../models/Routine');
const Competition = require('../models/Competition');
const Message = require('../models/Message');

// Ruta para obtener las métricas del dashboard
router.get('/metrics', async (req, res) => {
    try {
        const totalAlumnos = await User.countDocuments({ rol: 'alumno' });
        const totalRutinas = await Routine.countDocuments();
        const totalMensajes = await Message.countDocuments();
        const totalCompetencias = await Competition.countDocuments();
        
        // Aquí podrías agregar más lógicas, como las estadísticas de usuarios por mes
        // que se muestran en el gráfico de tu diseño. Por ahora, nos enfocaremos en los totales.

        res.json({
            totalAlumnos,
            totalRutinas,
            totalMensajes,
            totalCompetencias
        });
    } catch (err) {
        res.status(500).send('Error al obtener las métricas del dashboard');
    }
});

module.exports = router;