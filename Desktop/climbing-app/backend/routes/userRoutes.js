const express = require('express');
const router = express.Router();

// Define tus rutas aquí
router.get('/', (req, res) => {
    res.send('Ruta de usuarios funcionando');
});

// Más rutas...

module.exports = router; // <-- Esto es lo más importante