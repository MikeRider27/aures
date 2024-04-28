const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

autoIncrement.initialize(mongoose);

// Definir el esquema de la secuencia
const SequenciaSchema = new Schema({
    estado: { type: String, required: true },
    origenId: { type: Number, required: true, ref: "origens" },
    mostraId: { type: Number, required: true, ref: "amostras" },
    hospedeiro: { type: String, required: false },
    microorganismoIdSuspeito: { type: Number, required: true, ref: "microorganismos" },
    codigoPais: { type: String, required: true },
    cidade: { type: String, required: true },
    sequenciadorId: { type: Number, required: true, ref: "equipamentos" },
    laboratorioId: { type: Number, required: true, ref: "laboratorios" },
    servicoSaudeId: { type: Number, required: true, ref: "servicos" },
    dataNascimiento: { type: String, required: false },
    sexo: { type: String, required: false },
    dataColecta: { type: String, required: true },
    sequenciadoPor: { type: String },
    nroCorrida: { type: String, required: true },
    dataCorrida: { type: String, required: true },
    codigoOrigenExterno: { type: String, required: false },
    arquivofastqr1: { type: String, required: false },
    arquivofastqr2: { type: String, required: false },
    arquivofasta: { type: String, required: false },
    criadoEm: { type: Date, required: false },
    criadoPor: { type: String, required: false },
    ultimaTarefa: { type: String, required: false }
});

// Aplicar el plugin de auto incremento al esquema
SequenciaSchema.plugin(autoIncrement.plugin, 'sequencias');

// Exportar el modelo de la secuencia
module.exports = mongoose.model('sequencias', SequenciaSchema);
