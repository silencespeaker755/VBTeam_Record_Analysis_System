import swaggerUi from "swagger-ui-express";
import swaggerDoc from "../swagger_output.json";

export default async ({ app }) => {
  app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
};
