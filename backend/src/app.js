import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./modules/auth/auth.routes.js";

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
  }));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

export default app;
