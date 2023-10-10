import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger-output.json";

import ProductRoute from "./ProductRoute";
import GroupCategoryRoute from "./GroupCategoryRoute";
import AuthRoute from "./AuthRoute";
import { notFound } from "http/middlewares/handle_error";

const initRoutes = (app) => {
  // app.use("/api/v1/auth", AuthRoute);
  app.use("/api/v1/group-category", GroupCategoryRoute);
  // app.use("/api/v1/product", ProductRoute);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  return app.use(notFound);
};

export default initRoutes;
