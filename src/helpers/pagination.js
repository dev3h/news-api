const getPagination = (page, limit) => {
  const offset = !page || +page <= 1 ? 0 : +page - 1;
  const fLimit = limit ? +limit : Number.MAX_SAFE_INTEGER;
  return {
    offset: offset * fLimit,
    limit: fLimit,
  };
};
const getPagingData = (result, page, limit) => {
  const { count: totalItems, rows: data } = result;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, data, totalPages, currentPage };
};
export { getPagination, getPagingData };
