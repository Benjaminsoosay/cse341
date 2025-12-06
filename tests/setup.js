// Global test setup
process.env.NODE_ENV = 'test';

// Mock OAuth for testing
jest.mock('../middleware/auth.js', () => ({
  isAuthenticated: (req, res, next) => {
    // Mock authenticated user for testing
    req.user = {
      id: 'test-user-id',
      email: 'test@example.com',
      name: 'Test User'
    };
    next();
  },
  isAdmin: (req, res, next) => {
    req.user = {
      id: 'test-admin-id',
      email: 'admin@example.com',
      name: 'Admin User',
      role: 'admin'
    };
    next();
  }
}));

// Clean up after tests
afterAll(async () => {
  // Close any open connections
});