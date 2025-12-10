//? librerias externas
import express from "express";

//? rutas
import router from "./router/main.route.js";

//? configuracion de express
const app = express();

//? Middlewares
app.use(express.json()); // Para parsear JSON en req.body
app.use(express.urlencoded({ extended: true })); // Para parsear form-data

app.get("/", (_req, res) => {
	res.send("There's nothing here, go to /api");
});

app.use("/api", router);

export default app;
