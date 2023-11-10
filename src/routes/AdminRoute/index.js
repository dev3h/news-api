import GroupCategoryRoute from "./GroupCategoryRoute";
import CategoryRoute from "./CategoryRoute";
import PostRoute from "./PostRoute";
import TagRoute from "./TagRoute";
import ManagerAuthorRoute from "./ManagerAuthorRoute";
import RoleRoute from "./RoleRoute";

const AdminRoute = (app) => {
  app.use("/api/v1/group-category", GroupCategoryRoute);
  app.use("/api/v1/category", CategoryRoute);
  app.use("/api/v1/post", PostRoute);
  app.use("/api/v1/tag", TagRoute);
  app.use("/api/v1/manager-author", ManagerAuthorRoute);
  app.use("/api/v1/role", RoleRoute);
};

export default AdminRoute;
