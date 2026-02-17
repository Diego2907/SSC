//? librerias externas
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import env from "./config/env.config.js";
import path from "path";
import { corsDevOptions, corsProdOptions } from "./config/cors.config.js";

//? rutas
import router from "./router/main.route.js";

const app = express();

const isProduction = env.NODE_ENV === "production";
const selectedCorsOptions = isProduction ? corsProdOptions : corsDevOptions;

app.use(cors(selectedCorsOptions));

//? Middlewares
app.use(express.json()); // Para parsear JSON en req.body
app.use(express.urlencoded({ extended: true })); // Para parsear form-data
app.use(cookieParser()); // Para parsear cookies en req.cookies
// app.use(cors()); // Eliminado duplicado
// app.use(express.json()); // Eliminado duplicado

//? Archivos Estáticos (Imágenes, etc.)
// app.use("/uploads", express.static(path.join(process.cwd(), "public/uploads")));

app.get("/", (_req, res) => {
  res.send("There's nothing here, go to /api");
});

app.use("/api", router);

export default app;
