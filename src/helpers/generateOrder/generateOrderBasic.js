import db from "models";

const generateOrderBasic = (sortBy, sortType, custom = null) => {
  const order = [];
  if (sortBy && sortType) {
    if (sortBy === "created_by_admin.username") {
      order.push([{ model: db.Admin, as: "created_by_admin" }, "username", sortType]);
    } else if (sortBy === "updated_by_admin.username") {
      order.push([{ model: db.Admin, as: "updated_by_admin" }, "username", sortType]);
    } else if (custom !== null) {
      order.push(custom);
    } else {
      order.push([sortBy, sortType]);
    }
  }
  return order;
};
export default generateOrderBasic;
