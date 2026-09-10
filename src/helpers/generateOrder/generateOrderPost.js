import db from "models";
import generateOrderBasic from "./generateOrderBasic";

const generateOrderPost = (sortBy, sortType) => {
  if (sortBy === "category.name") {
    const order = generateOrderBasic(sortBy, sortType, [
      { model: db.Category, as: "category" },
      "name",
      sortType,
    ]);
    return order;
  } else {
    const order = generateOrderBasic(sortBy, sortType);
    return order;
  }
};
export default generateOrderPost;
