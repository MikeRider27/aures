const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

autoIncrement.initialize(mongoose);

// Definir el esquema del microorganismo
const MicroOrganismoSchema = new Schema({
    estado: { type: String, required: true }, // Estado del microorganismo
    microorganismo: { type: String, required: true }, // Nombre del microorganismo
    especie: { type: String, required: true }, // Especie del microorganismo
    genero: { type: String, required: true } // Género del microorganismo
});

// Aplicar el plugin de auto incremento al esquema
MicroOrganismoSchema.plugin(autoIncrement.plugin, 'microorganismos');

// Exportar el modelo del microorganismo
module.exports = mongoose.model('microorganismos', MicroOrganismoSchema);
