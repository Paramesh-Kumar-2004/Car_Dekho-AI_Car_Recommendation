import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import recommendationRoutes from "./routes/recomendationRoutes.js";

dotenv.config();

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

app.use(express.json());

app.use("/api/recommend", recommendationRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buildDir = path.join(__dirname, "./dist");

app.use(express.static(buildDir));

app.get("*", (req, res) => {
    res.sendFile(path.join(buildDir, "index.html"));
});


app.listen(5000, () => {
    console.log("Server Running On Port 5000");
});