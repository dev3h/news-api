import db from "models";

const generateOrder = (sortBy, sortType) => {
  const order = [];
  if (sortBy && sortType) {
    if (sortBy === "created_by_admin.username") {
      order.push([{ model: db.Admin, as: "created_by_admin" }, "username", sortType]);
    } else if (sortBy === "updated_by_admin.username") {
      order.push([{ model: db.Admin, as: "updated_by_admin" }, "username", sortType]);
    } else {
      order.push([sortBy, sortType]);
    }
  }
  return order;
};
export default generateOrder;
