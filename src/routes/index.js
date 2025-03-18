import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger-output.json";

import { notFoundRoute } from "../helpers/generateError";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";
import AdminAuthRoute from "./AuthRoute/AdminAuthRoute";
import UserAuthRoute from "./AuthRoute/UserAuthRoute";

const initRoutes = (app) => {
  AdminAuthRoute(app);
  UserAuthRoute(app);
  AdminRoute(app);
  UserRoute(app);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use("/health", (_, res) => res.sendStatus(200));

  return app.use(notFoundRoute);
};

export default initRoutes;
