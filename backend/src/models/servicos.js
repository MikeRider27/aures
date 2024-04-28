const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

autoIncrement.initialize(mongoose);

// Definir el esquema del servicio
const ServicoSchema = new Schema({
    nome: { type: String, required: true }, // Nombre del servicio
    estado: { type: String, required: true }, // Estado del servicio
    pais: { type: String, required: true }, // País del servicio
    ciudad: { type: String, required: true }, // Ciudad del servicio
    contacto: { type: String, required: true }, // Persona de contacto del servicio
    tipo: { type: String, required: true }, // Tipo de servicio
    telefono: { type: String, required: true }, // Teléfono del servicio
    email: { type: String, required: true } // Correo electrónico del servicio
});

// Aplicar el plugin de auto incremento al esquema
ServicoSchema.plugin(autoIncrement.plugin, 'servicos');

// Exportar el modelo del servicio
module.exports = mongoose.model('servicos', ServicoSchema);
