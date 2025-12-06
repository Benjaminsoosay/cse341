
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ 
    error: 'Unauthorized',
    message: 'You must be logged in to access this resource',
    loginUrl: '/auth/google'
  });
};


const isAdmin = (req, res, next) => {
  if (req.isAuthenticated()) {
    
    return next();
  }
  res.status(403).json({ 
    error: 'Forbidden',
    message: 'Admin privileges required'
  });
};

module.exports = {
  isAuthenticated,
  isAdmin
};