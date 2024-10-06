const express = require('express');
const router = express.Router();
const OfertaCurso = require("../models/ofertaCurso");

/*
    METHODS:
    ------------
    x GET all ofertas
    X GET all ofertas by CODIGO_CURSO and PERIODO and SECCION
    x GET one OFERTA by id
    x POST new oferta
    x PATCH an oferta
    x DELETE an oferta
*/

// GET all ofertas (sin filtros)
router.get("/", async(req, res) => {
    // filter = {};
    // if (req.body.codigo_curso != null)
    //     filter.codigo_curso = req.body.codigo_curso;
    // if (req.body.periodo != null)
    //     filter.periodo = req.body.periodo;
    // if (req.body.seccion != null)
    //     filter.seccion = req.body.seccion;
    try {
        const ofertas = await OfertaCurso.find().populate("horarios");
        res.json(ofertas);
    }
    catch (err) {
        res.status(500).json({message:err.message});
    }
});

// GET all ofertas by Codigo curso and periodo and seccion
router.get("/:codigo_curso/:periodo/:seccion", async(req, res) => {
    filter = {
        codigo_curso: req.params.codigo_curso,
        periodo: req.params.periodo,
        seccion: req.params.seccion
    };
    try {
        const ofertas = await OfertaCurso.find(filter).populate("horarios");
        res.json(ofertas);
    }
    catch (err) {
        res.status(500).json({message:err.message});
    }
});


// GET one OFERTA by id
router.get("/:id", getOferta, async(req, res) =>  {
    res.json(res.oferta);
});

// POST oferta
router.post("/", async(req, res) => {
    const rb = req.body;
    let oferta = new OfertaCurso({
        codigo_curso: rb.codigo_curso,
        nombre_curso: rb.nombre_curso,
        creditos: rb.creditos,
        seccion: rb.seccion,
        periodo: rb.periodo,
        total_cupos: rb.total_cupos, 
        horarios: rb.horarios
    });
    try {
        const nuevaOferta = await oferta.save();
        res.status(201).json(nuevaOferta);
    }
    catch (err) {
        res.status(200).json({ message: err.message });
    }
});

// PATCH oferta by ID
router.patch("/:id", getOferta, async(req, res) => {
    const rb = req.body;
    if (rb.codigo_curso != null)
        res.oferta.codigo_curso = rb.codigo_curso;
    if (rb.nombre_curso != null)
        res.oferta.nombre_curso = rb.nombre_curso;
    if (rb.creditos != null)
        res.oferta.creditos = rb.creditos;
    if (rb.seccion != null)
        res.oferta.seccion = rb.seccion;
    if (rb.periodo != null)
        res.oferta.periodo = rb.periodo;
    if (rb.total_cupos != null)
        res.oferta.total_cupos = rb.total_cupos;
    if (rb.nro_inscritos != null)
        res.oferta.nro_inscritos = rb.nro_inscritos;
    if (rb.horarios != null)
        res.oferta.horarios = rb.horarios;
    try {
        const updatedOferta = await res.oferta.save();
        res.json(updatedOferta);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }

});

// DELETE by ID
router.delete("/:id", getOferta, async(req, res) => {
    try {
        await res.oferta.deleteOne();
        res.json({ message: "Se borró la oferta del curso exitosamente" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Middleware para encontrar por id
async function getOferta(req, res, next) {
    try {
        const oferta = await OfertaCurso.findById(req.params.id);
        if (!oferta)
            return res.status(404).json({message: "No se encontró la programación."});
        res.oferta = oferta;
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
    next();
}

module.exports = router;