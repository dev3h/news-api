import authRoute from "./authRoute";

const UserAuthRoute = (app) => {
  app.use("/api/v1/auth/user", authRoute);
};

export default UserAuthRoute;
