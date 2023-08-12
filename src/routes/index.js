import department from "./department";
import company from "./company";

const initRoutes = (app) => {
  app.use("/api/v1/department", department);
  app.use("/api/v1/company", company);
};

export default initRoutes;
