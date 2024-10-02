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

module.exports = horarioSchema;