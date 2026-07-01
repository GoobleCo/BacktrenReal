//configuración de express
import express from "express";
import cors from "cors";
import morgan from "morgan";
import headRoutes from "./routes/head.routes.js";
import healthRoutes from "./routes/health.routes.js";
import dbRoutes from "./routes/db.routes.js";
import userRoutes from "./routes/users.routes.js";

//import usuarios from "./router/users";
// import materias from "./router/materias"; // route file not found in current workspace

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/heads", headRoutes);
app.use("/api", healthRoutes);
app.use("/api/db", dbRoutes);
app.use("/api/users", userRoutes);

//Rutas
//app.use("/users", usuarios);
//app.use("/materias", materias);

export default app;