const generateCreatedByAndUpdatedBy = (id) => {
  return {
    created_by: id,
    updated_by: id,
  };
};
const generateUpdatedBy = (id) => {
  return {
    updated_by: id,
  };
};

export { generateCreatedByAndUpdatedBy, generateUpdatedBy };
