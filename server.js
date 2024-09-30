// require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.on("open", () => console.log("Connected to MongoDB"));

app.use(express.json());

const cursosRouter = require("./routes/curso");
app.use("/curso", cursosRouter);

const programacionesRouter = require("./routes/programacion");
app.use("/programacion", programacionesRouter);

app.listen(3000, () => console.log("Server started"));