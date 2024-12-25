import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import authRoutes from "./app/modules/auth/auth.routes";
import projectRoutes from "./app/modules/project/project.routes";
import experienceRoutes from "./app/modules/experience/experience.routes";

const app: Application = express();

// parsers
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// application route
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/experiences", experienceRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to portfolio server");
});

app.use(globalErrorHandler);

export default app;
