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


const programacionSchema = new mongoose.Schema({
    curso: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Curso",
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
});

module.exports = mongoose.model("Programacion", programacionSchema);