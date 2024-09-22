/*
    MONGOOSE - SAVE A REFERENCE (de la documentación de mongoose)
const author = new Person({
  _id: new mongoose.Types.ObjectId(),
  name: 'Ian Fleming',
  age: 50
});

await author.save();

const story1 = new Story({
  title: 'Casino Royale',
  author: author._id // assign the _id from the person
});

await story1.save();
// that's it!
*/

const express = require("express");
const router = express.Router();
const Programacion  = require("../models/programacion");

/*
    METHODS:
    ------------
    x GET all programaciones
    - GET one programación by ID
    - GET all programaciones by CURSO ID
    - GET all programaciones by PERIODO
    x POST new programación
    - PATCH a programación
    - DELETE a programación
*/

// GET all
router.get("/", async(req, res) => {
    try {
        const programaciones = await Programacion.find().populate("curso", "nombre");
        res.json(programaciones);
    }
    catch (err) {
        res.status(500).json({message:err.message});
    }
});

// GET one by ID
router.get("/:id", getProgramacion, (req, res) => {
    res.json(res.programacion);
});

// GET all by CURSO ID
router.get("/curso/:id", async(req, res) => {
    try {
        const programaciones = await Programacion.find({ curso: req.params.id });
        res.json(programaciones);
    }
    catch (err) {
        res.status(500).json({message:err.message});
    }
});

// GET all by PERIODO
router.get("/periodo/:periodo", async(req, res) => {
    try {
        const programaciones = await Programacion.find({ 
            periodo: req.params.periodo
        });
        res.json(programaciones);
    }
    catch (err) {
        res.status(500).json({ message:err.message });
    }
});

// POST one
router.post("/", async(req, res) => {
    let programacion = new Programacion({
        curso: req.body.curso,
        periodo: req.body.periodo,
        seccion: req.body.seccion,
        horarios: req.body.horarios
    });

    try {
        const nuevaProgramacion = (await programacion.save());
        res.status(201).json(nuevaProgramacion);
    }
    catch (err) {
        res.status(400).json({message:err.message});
    }
});


// PATCH one by ID
router.patch("/:id", getProgramacion, async(req, res) => {
    const rb = req.body;
    if (rb.curso != null)
        res.programacion.curso = rb.curso;
    if (rb.periodo != null)
        res.programacion.periodo = rb.periodo;
    if (rb.seccion != null)
        res.programacion.seccion = rb.seccion;
    if (rb.horarios != null)
        res.programacion.horarios = rb.horarios;
    
    try {
        const ProgramacionActualizada = await res.programacion.save();
        res.json(ProgramacionActualizada);
    }
    catch (err) {
        res.status(400).json({message:err.message});
    }
});

// DELETE by ID
router.delete("/:id", getProgramacion, async(req, res) => {
    try {
        // getProgramacioin ya encontró la programación por su ID y la puso en res
        await res.programacion.deleteOne();
        res.json({ message: "Se borró la programación del curso exitosamente" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function para encontrar por id
async function getProgramacion(req, res, next) {
    let programacion;
    try {
        programacion = await Programacion.findById(req.params.id);
        if (programacion == null)
            return res.status(404).json({message: "No se encontró la programación."});
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.programacion = programacion;
    next();
}

module.exports = router;