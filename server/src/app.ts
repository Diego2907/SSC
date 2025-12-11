//? librerias externas
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

//? rutas
import router from "./router/main.route.js";

const app = express();
dotenv.config();

//? Middlewares
app.use(express.json()); // Para parsear JSON en req.body
app.use(express.urlencoded({ extended: true })); // Para parsear form-data
app.use(cookieParser()); // Para parsear cookies en req.cookies

app.get("/", (_req, res) => {
	res.send("There's nothing here, go to /api");
});

app.use("/api", router);

export default app;
