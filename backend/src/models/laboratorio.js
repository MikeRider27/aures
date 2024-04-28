const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

autoIncrement.initialize(mongoose);

// Definir el esquema del laboratorio
const LaboratorioSchema = new Schema({
    nome: { type: String, required: true }, // Nombre del laboratorio
    estado: { type: String, required: true }, // Estado del laboratorio
    abreviatura: { type: String, required: true } // Abreviatura del laboratorio
});

// Aplicar el plugin de auto incremento al esquema
LaboratorioSchema.plugin(autoIncrement.plugin, 'laboratorios');

// Exportar el modelo del laboratorio
module.exports = mongoose.model('laboratorios', LaboratorioSchema);
