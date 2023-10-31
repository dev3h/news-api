import PostRoute from "./PostRoute";

const UserRoute = (app) => {
  app.use("/api/v1/user/post", PostRoute);
};

export default UserRoute;
