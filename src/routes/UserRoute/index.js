import PostRoute from "./PostRoute";
import GroupRoute from "./GroupRoute";

const UserRoute = (app) => {
  app.use("/api/v1/user/post", PostRoute);
  app.use("/api/v1/user/group", GroupRoute);
};

export default UserRoute;
