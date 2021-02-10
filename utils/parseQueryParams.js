export const parseQueryParams = ({ queryRange, querySort, queryFilter }) => {
  const range = JSON.parse(queryRange);
  const sort = JSON.parse(querySort);
  const filter = JSON.parse(queryFilter);
  const limit = range[1] - range[0];
  return { range, sort, filter, limit };
};
