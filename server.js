require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.on("open", () => console.log("Connected to MongoDB"));

app.use(express.json());

const cursosRouter = require("./routes/curso");
app.use("/cursos", cursosRouter);

const ofertasCursosRouter = require("./routes/ofertaCurso");
app.use("/ofertas", ofertasCursosRouter);

const inscripcionRouter = require("./routes/inscripcion");
app.use("/inscripciones", inscripcionRouter);

app.listen(3000, () => console.log("Server started"));