const mongoose = require("mongoose");

const horarioSchema = new mongoose.Schema({
    salon: {
        type: String,
        required: true
    },
    dia: {
        type: Number,
        required: true
    },
    hora_inicio: {
        type: Number,
        required: true
    },
    hora_fin: {
        type: Number,
        required: true
    }
});

const inscripcionSchema = new mongoose.Schema({
    codigo_alumno: {
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
    nro_vez: {
        type: Number,
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
    horarios: [horarioSchema]
    // tal vez codigo y nombre de profesor?
})