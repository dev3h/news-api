import authRoute from "./authRoute";
const AdminAuthRoute = (app) => {
  app.use("/api/v1/auth/admin", authRoute);
};
export default AdminAuthRoute;
