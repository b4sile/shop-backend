export const setDefaultQueryParameters = (req, res, next) => {
  if (!req.query.filter) {
    req.query.filter = '{}';
  }
  if (!req.query.sort) {
    req.query.sort = '["id", "ASC"]';
  }
  if (!req.query.range) {
    req.query.range = '[0, 50]';
  }
  next();
};
