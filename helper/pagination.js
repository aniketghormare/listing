const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: alldata } = data;
    const currentPage = parseInt(page ? page : 0);
  let totalPages = Math.ceil(totalItems / limit);
   
  return { totalItems, alldata, totalPages, currentPage };
};

const getPagination = (page, l) => {
  const limit = l ? l : 3;
  const offset = page ? --page * limit : 0;
   
  return { offset };
};

module.exports = {
    getPagingData,
    getPagination,
}
