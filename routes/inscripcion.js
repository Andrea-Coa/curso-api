const express = require('express');
const router = express.Router();
const Inscripcion = require("../models/inscripcion");
const inscripcion = require('../models/inscripcion');

/*
    METHODS:
    ------------
    x GET all inscripciones
    x GET all inscripciones by CORREO_ALUMNO and periodo filter?
    x POST new inscripcion
    x PATCH an inscripcion
    x DELETE an inscripcion
*/

// GET all
router.get("/", async(req, res) => {
    try {
        const inscripciones = await Inscripcion.find().populate("horarios");
        res.json(inscripciones);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// GET one by Id
router.get("/:id", getInscripcion, async(req, res) => {
    res.json(res.inscripcion);
})

// GET all by CORREO_ALUMNO and periodo (opcional)
router.get("/alumno/:correo_alumno", async(req, res) => {
    let filters =  {
        correo_alumno: req.params.correo_alumno
    };
    if (req.body.periodo != null) {
        filters.periodo = req.body.periodo;
    }
    try {
        const inscripciones = await Inscripcion.find(filters);
        if (inscripciones.length === 0) {
            return res.status(404).json({ message: "No inscriptions found" });
        }
        res.json(inscripciones);
    }
    catch (err) {
        res.status(500).json({message:err.message});
    }   
    
});

// POST inscripcion
router.post("/", async(req, res) => {
    const rb = req.body;
    let inscripcion = new Inscripcion({
        correo_alumno: rb.correo_alumno,
        codigo_curso: rb.codigo_curso,
        nombre_curso: rb.nombre_curso,
        periodo: rb.periodo,
        seccion: rb.seccion,
        nro_vez: rb.nro_vez,
        horarios: rb.horarios
    });
    try {
        const newInscripcion = await inscripcion.save();
        res.status(201).json(newInscripcion);
    }
    catch (err) {
        res.status(400).json({message:err.message});
    }
});

// PATCH inscripcion
router.patch("/:id", getInscripcion, async(req, res) => {
    const rb = req.body;
    if (rb.correo_alumno != null)
        res.inscripcion.correo_alumno = rb.correo_alumno;
    if (rb.codigo_curso != null)
        res.inscripcion.codigo_curso = rb.codigo_curso;
    if (rb.nombre_curso != null)
        res.inscripcion.nombre_curso = rb.nombre_curso;
    if (rb.periodo != null)
        res.inscripcion.periodo = rb.periodo;
    if (rb.seccion != null)
        res.inscripcion.seccion = rb.seccion;
    if (rb.nro_vez != null)
        res.inscripcion.nro_vez = rb.nro_vez;
    if (rb.horarios != null)
        res.inscripcion.horarios = rb.horarios;
    try {
        const updatedInscripcion = await res.inscripcion.save();
        res.json(updatedInscripcion);
    }
    catch (err) {
        res.status(400).json({message:err.message});
    }
});

// DELETE inscripcion
router.delete("/:id", getInscripcion, async(req, res) => {
    try {
        await res.inscripcion.deleteOne();
        res.json({ "message":"Se eliminó la inscripción correctamente."});
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function para encontrar inscripción por id
async function getInscripcion(req, res, next) {
    try {
        const inscripcion = await Inscripcion.findById(req.params.id);
        if (!inscripcion)
            return res.status(404).json({message: "No se encontró la inscripción."});
        res.inscripcion = inscripcion;
    }
    catch(err) {
        return res.status(500).json({ message: err.message });
    }
    next();
}

module.exports = router;