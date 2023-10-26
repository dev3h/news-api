import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger-output.json";

import GroupCategoryRoute from "./GroupCategoryRoute";
import CategoryRoute from "./CategoryRoute";
import PostRoute from "./PostRoute";
import TagRoute from "./TagRoute";
import AdminAuthRoute from "./AuthRoute/AdminAuthRoute";
import UserAuthRoute from "./AuthRoute/UserAuthRoute";
import { notFoundRoute } from "../helpers/generateError";

const initRoutes = (app) => {
  app.use("/api/v1/auth/admin", AdminAuthRoute);
  app.use("/api/v1/auth/user", UserAuthRoute);
  app.use("/api/v1/group-category", GroupCategoryRoute);
  app.use("/api/v1/category", CategoryRoute);
  app.use("/api/v1/post", PostRoute);
  app.use("/api/v1/tag", TagRoute);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  return app.use(notFoundRoute);
};

export default initRoutes;
