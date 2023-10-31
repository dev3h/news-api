import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger-output.json";

import { AdminAuthRoute, UserAuthRoute } from "./AuthRoute";
import { notFoundRoute } from "../helpers/generateError";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";

const initRoutes = (app) => {
  AdminAuthRoute(app);
  UserAuthRoute(app);
  AdminRoute(app);
  UserRoute(app);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  return app.use(notFoundRoute);
};

export default initRoutes;
