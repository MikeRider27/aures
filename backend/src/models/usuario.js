const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definir el esquema del usuario
const UsuarioSchema = new Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    usuario: { type: String, required: true },
    senha: { type: String, required: true },
    codigoPais: { type: String, required: true }, // Corregir duplicado
    estado: { type: String, required: true },
    tipo: { type: String, required: true },
    institucao: { type: String },
    posicao: { type: String },
    interesse: { type: String },
    criadoEm: { type: Date, required: false },
    criadoPor: { type: String, required: false },
    ativadoEm: { type: Date, required: false },
    ativadoPor: { type: String, required: false }
});

// Exportar el modelo del usuario
module.exports = mongoose.model('usuario', UsuarioSchema);
