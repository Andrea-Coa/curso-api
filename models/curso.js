const mongoose = require("mongoose");

const cursoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    creditos: {
        type: Number,
        required: true
    },
    horas_semana: {
        type: Number,
        required: true
    },
    categoria: {
        type: String,
        required: true,
        default: "Cursos generales"
    }
});

module.exports = mongoose.model("Curso", cursoSchema);