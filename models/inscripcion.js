const mongoose = require("mongoose");
const horarioSchema = require("./horario");

const inscripcionSchema = new mongoose.Schema({
    correo_alumno: {
        type: String,
        required: true
    },
    codigo_curso: {
        type: String,
        required: true
    },
    nombre_curso: {
        type: String,
        required: true
    },
    periodo: {
        type: String,
        required: true
    },
    seccion: {
        type: Number,
        required: true
    },
    nro_vez: {
        type: Number,
        required: true
    },
    horarios: [horarioSchema]
});

module.exports = mongoose.model("Inscripcion", inscripcionSchema);