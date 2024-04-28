const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

autoIncrement.initialize(mongoose);

// Definir el esquema de la muestra
const AmostraSchema = new Schema({
    nome: { type: String, required: true }, // Nombre de la muestra
    grupo: { type: String, required: true }, // Grupo al que pertenece la muestra
    estado: { type: String, required: true } // Estado de la muestra
});

// Aplicar el plugin de auto incremento al esquema
AmostraSchema.plugin(autoIncrement.plugin, 'amostras');

// Exportar el modelo de la muestra
module.exports = mongoose.model('amostras', AmostraSchema);
