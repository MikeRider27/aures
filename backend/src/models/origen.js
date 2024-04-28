const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

autoIncrement.initialize(mongoose);

// Definir el esquema del origen
const OrigenSchema = new Schema({
    nome: { type: String, required: true }, // Nombre del origen
    estado: { type: String, required: true } // Estado del origen
});

// Aplicar el plugin de auto incremento al esquema
OrigenSchema.plugin(autoIncrement.plugin, 'origens');

// Exportar el modelo del origen
module.exports = mongoose.model('origens', OrigenSchema);
