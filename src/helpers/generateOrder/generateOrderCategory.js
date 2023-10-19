import db from "models";
import generateOrderBasic from "./generateOrderBasic";

const generateOrderCategory = (sortBy, sortType) => {
  if (sortBy === "group_category.name") {
    const order = generateOrderBasic(sortBy, sortType, [
      { model: db.GroupCategory, as: "group_category" },
      "name",
      sortType,
    ]);
    return order;
  } else {
    const order = generateOrderBasic(sortBy, sortType);
    return order;
  }
};
export default generateOrderCategory;
