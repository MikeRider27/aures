const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definir el esquema del país
const PaisSchema = new Schema({
    _id: { type: String, required: true }, // Identificador único del país
    nome: { type: String, required: true } // Nombre del país
});

// Exportar el modelo del país
module.exports = mongoose.model('paises', PaisSchema);
