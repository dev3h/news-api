import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger-output.json";

import GroupCategoryRoute from "./GroupCategoryRoute";
import CategoryRoute from "./CategoryRoute";
import PostRoute from "./PostRoute";
import TagRoute from "./TagRoute";
import AdminAuthRoute from "./AuthRoute/AdminAuthRoute";
import { notFound } from "http/middlewares/handle_error";

const initRoutes = (app) => {
  app.use("/api/v1/admin/auth", AdminAuthRoute);
  app.use("/api/v1/group-category", GroupCategoryRoute);
  app.use("/api/v1/category", CategoryRoute);
  app.use("/api/v1/post", PostRoute);
  app.use("/api/v1/tag", TagRoute);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  return app.use(notFound);
};

export default initRoutes;
