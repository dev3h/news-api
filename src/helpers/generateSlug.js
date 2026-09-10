import slugify from "slugify";

const generateSlug = (name) => {
  return slugify(name, { lower: true });
};
export default generateSlug;
