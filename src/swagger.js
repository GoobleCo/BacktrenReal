import path from "path";
import { fileURLToPath } from "url";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerFiles = [
  path.resolve(__dirname, "routes", "health.routes.js"),
  path.resolve(__dirname, "routes", "users.routes.js"),
  path.resolve(__dirname, "routes", "head.routes.js"),
  path.resolve(__dirname, "routes", "db.routes.js"),
].map((filePath) => filePath.replace(/\\/g, "/"));

const getSwaggerSpec = () => {
  return swaggerJsdoc({
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Alarcoin Backend API",
        version: "1.0.0",
        description: "Documentación interactiva de la API del backend de Alarcoin.",
      },
      servers: [
        {
          url: `http://localhost:${process.env.PORT || 3000}`,
          description: "Servidor local de desarrollo",
        },
      ],
      tags: [
        { name: "Health", description: "Endpoints de estado del servicio" },
        { name: "Users", description: "Gestión de usuarios" },
        { name: "Heads", description: "Gestión de heads" },
        { name: "Database", description: "Diagnóstico de base de datos" },
      ],
    },
    apis: swaggerFiles,
  });
};

export const setupSwagger = (app) => {
  const swaggerSpec = getSwaggerSpec();

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));
  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(getSwaggerSpec());
  });
};

export default getSwaggerSpec();
