const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: { type: String, enum: ['admin', 'alumno'], default: 'alumno' },
    googleId: String,
    facebookId: String
}, {
    timestamps: true // Añade automáticamente campos de creación y actualización
});

module.exports = mongoose.model('User', UserSchema);