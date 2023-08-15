import department from "./department";
import company from "./company";
import unit from "./unit";
import supplier from "./supplier";
import origin from "./origin";
import groupProduct from "./group-product";

const initRoutes = (app) => {
  app.use("/api/v1/department", department);
  app.use("/api/v1/company", company);
  app.use("/api/v1/company", company);
  app.use("/api/v1/unit", unit);
  app.use("/api/v1/supplier", supplier);
  app.use("/api/v1/origin", origin);
  app.use("/api/v1/group-product", groupProduct);
};

export default initRoutes;
