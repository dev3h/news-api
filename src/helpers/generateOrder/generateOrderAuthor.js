import db from "models";
import generateOrderBasic from "./generateOrderBasic";

const generateOrderAuthor = (sortBy, sortType) => {
  if (sortBy === "roleInfo.name") {
    const order = generateOrderBasic("role", sortType);
    return order;
  } else {
    const order = generateOrderBasic(sortBy, sortType);
    return order;
  }
};
export default generateOrderAuthor;
