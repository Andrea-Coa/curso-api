const mongoose = require("mongoose");
const horarioSchema = require("./horario");

const ofertaCursoSchema = new mongoose.Schema({
    codigo_curso: {
        type: String,
        required: true
    },
    nombre_curso: {
        type: String,
        required: true
    },
    creditos: {
        type: Number,
        required: true
    },
    seccion: {
        type: Number,
        required: true
    },
    periodo: {
        type: String,
        required: true
    },
    total_cupos: {
        type: Number,
        required: true,
        default: 30
    },
    nro_inscritos: {
        type: Number,
        default: 0
    },
    horarios: [horarioSchema]
});

module.exports = mongoose.model("OfertaCurso", ofertaCursoSchema);