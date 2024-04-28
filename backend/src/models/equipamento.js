const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

autoIncrement.initialize(mongoose);

// Definir el esquema del equipo
const EquipamentoSchema = new Schema({
    estado: { type: String, required: true }, // Estado del equipo
    marca: { type: String, required: true }, // Marca del equipo
    modelo: { type: String, required: true } // Modelo del equipo
});

// Aplicar el plugin de auto incremento al esquema
EquipamentoSchema.plugin(autoIncrement.plugin, 'equipamentos');

// Exportar el modelo del equipo
module.exports = mongoose.model('equipamentos', EquipamentoSchema);
