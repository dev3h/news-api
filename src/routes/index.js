import DepartmentRoute from "./DepartmentRoute";
import CompanyRoute from "./CompanyRoute";
import UnitRoute from "./UnitRoute";
import SupplierRoute from "./SupplierRoute";
import OriginRoute from "./OriginRoute";
import GroupProductRoute from "./GroupProductRoute";
import ProductRoute from "./ProductRoute";
import { notFound } from "../http/middlewares/handle_error";

const initRoutes = (app) => {
  app.use("/api/v1/department", DepartmentRoute);
  app.use("/api/v1/company", CompanyRoute);
  app.use("/api/v1/unit", UnitRoute);
  app.use("/api/v1/supplier", SupplierRoute);
  app.use("/api/v1/origin", OriginRoute);
  app.use("/api/v1/group-product", GroupProductRoute);
  app.use("/api/v1/product", ProductRoute);

  return app.use(notFound);
};

export default initRoutes;
