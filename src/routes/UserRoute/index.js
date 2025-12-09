import PostRoute from "./PostRoute";
import GroupRoute from "./GroupRoute";
import SiteMapRoute from "./SiteMapRoute";

const UserRoute = (app) => {
  app.use("/api/v1/user/post", PostRoute);
  app.use("/api/v1/user/group", GroupRoute);
  app.use("/api/v1/sitemap.xml", SiteMapRoute);
};

export default UserRoute;
