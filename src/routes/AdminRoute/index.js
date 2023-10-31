import GroupCategoryRoute from "./GroupCategoryRoute";
import CategoryRoute from "./CategoryRoute";
import PostRoute from "./PostRoute";
import TagRoute from "./TagRoute";

const AdminRoute = (app) => {
  app.use("/api/v1/group-category", GroupCategoryRoute);
  app.use("/api/v1/category", CategoryRoute);
  app.use("/api/v1/post", PostRoute);
  app.use("/api/v1/tag", TagRoute);
};

export default AdminRoute;
