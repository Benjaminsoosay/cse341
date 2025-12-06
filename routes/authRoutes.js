const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    req.user = req.session.user;
    return next();
  }
  
  const error = new Error('Unauthorized: Login required');
  error.status = 401;
  next(error);
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  
  const error = new Error('Forbidden: Admin access required');
  error.status = 403;
  next(error);
};

module.exports = { isAuthenticated, isAdmin };