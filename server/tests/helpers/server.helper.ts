import express, { Router } from "express";
import supertest from "supertest";

const testServer = (router: Router, basePath = "") => {
	const app = express();

	app.use(express.json());
	app.use(basePath, router);

	return supertest(app);
};

export default testServer;
