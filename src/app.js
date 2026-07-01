//configuración de express
import express from "express";
import cors from "cors";
import morgan from "morgan";
import healthRoutes from "./routes/health.routes.js";
import usersRoutes from "./routes/users.routes.js";
import headRoutes from "./routes/head.routes.js";
import dbRoutes from "./routes/db.routes.js";
import { setupSwagger } from "./swagger.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

setupSwagger(app);

//Rutas
app.use("/health", healthRoutes);
app.use("/users", usersRoutes);
app.use("/heads", headRoutes);
app.use("/db", dbRoutes);

export default app;