const mongoose = require("mongoose");

const cursoSchema = new mongoose.Schema({
    codigo_curso: {
        type: String,
        required: true
    },
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
    },
    descripcion: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Curso", cursoSchema);