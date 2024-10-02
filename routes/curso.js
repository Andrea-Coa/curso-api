const express = require('express');
const router = express.Router();
const Curso = require("../models/curso");

/*
    METHODS:
    ------------
    GET all courses
    GET one course by ID
    POST new course
    PATCH a course
    DELETE a course
*/

// GET all courses
router.get("/", async (req, res) => {
    try {
        const cursos = await Curso.find();
        res.json(cursos);
    }   
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET one course by ID
router.get("/:id", async(req, res) => {
    let curso;
    try {
        curso = await Curso.findById(req.params.id);
        if (curso == null) {
            return res.status(404).json({ message: "No se encontró el curso" });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message});
    }
    res.json(curso);
});

// POST  a new course
router.post("/", async (req, res) => {
    const curso = new Curso({
        codigo_curso: req.body.codigo_curso,
        nombre: req.body.nombre,
        creditos: req.body.creditos,
        horas_semana: req.body.horas_semana,
        categoria: req.body.categoria,
        descripcion: req.body.descripcion
    });
    try {
        const nuevoCurso = await curso.save();
        res.status(201).json(nuevoCurso);
    }
    catch (err) {
        res.status(400).json({message: err.message});
    }
});

// PATCH a course by ID
router.patch("/:id", getCurso, async(req, res) => {
    const rb = req.body;
    if (rb.codigo_curso != null)
        res.curso.codigo_curso = rb.codigo_curso;
    if (rb.nombre != null)
        res.curso.nombre = rb.nombre;
    if (rb.creditos != null)
        res.curso.creditos = rb.creditos;
    if (rb.horas_semana != null)
        res.curso.horas_semana = rb.horas_semana;
    if (rb.categoria != null)
        res.curso.categoria = rb.categoria;
    if (rb.descripcion != null)
        res.curso.descripcion = rb.descripcion;

    try {
        const cursoActualizado = await res.curso.save();
        res.json(cursoActualizado);
    }
    catch (err) {
        res.status(400).json({ message: err.message});
    }
});

// DELETE curso por ID
router.delete("/:id", getCurso, async(req, res) => {
    try {
        await res.curso.deleteOne();
        res.json({ message: "Se borró el curso exitosamente" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware para obtener curso de la bd
async function getCurso(req, res, next) {
    let curso;
    try {
        curso = await Curso.findById(req.params.id);
        if (curso == null)
            return res.status(404).json({ message: "No se encontró el curso" });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.curso = curso;
    next();
}



module.exports = router