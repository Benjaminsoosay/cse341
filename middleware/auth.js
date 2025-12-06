const isAuthenticated = (req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
    
        req.user = {
            id: 'dev-user-123',
            displayName: 'Development User',
            email: 'dev@example.com',
            role: 'user'
        };
        return next();
    }
    
    if (req.session && req.session.user) {
        req.user = req.session.user;
        return next();
    }
    
    const error = new Error('Unauthorized: Authentication required');
    error.status = 401;
    next(error);
};

const isAdmin = (req, res, next) => {
    // For development, allow all authenticated users as admin
    if (process.env.NODE_ENV === 'development') {
        return next();
    }
    
    // Check if user has admin role
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    
    const error = new Error('Forbidden: Admin privileges required');
    error.status = 403;
    next(error);
};

module.exports = { isAuthenticated, isAdmin };
