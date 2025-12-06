# Team 16 - Individual Contributions

## Project: CSE341 Final Project - Event Management API

### Team Members:
1. Benjamin Soosay
2. [Team Member 2 Name]
3. [Team Member 3 Name]
4. [Team Member 4 Name]

---

## Individual Contributions

### Benjamin Soosay
**Week 6 Contributions:**

1. **API Server Setup and Configuration**
   - Set up Express.js server with proper middleware (cors, express.json)
   - Configured environment variables using dotenv
   - Implemented basic error handling middleware
   - Created the main app.js structure with route organization

2. **Swagger/OpenAPI Documentation**
   - Designed comprehensive API documentation for all collections
   - Implemented OAuth security scheme definition
   - Added data validation requirements for all POST/PUT endpoints
   - Created detailed response schemas for all endpoints
   - Set up Swagger UI at `/api-docs` route

3. **Test Framework Setup**
   - Created test directory structure
   - Set up Jest/Node test configuration
   - Implemented unit tests for GET endpoints on Users, Products, Reviews, and Orders collections
   - Added validation testing for POST endpoints

4. **Route Implementation**
   - Created userRoutes.js with CRUD operations
   - Implemented productRoutes.js with full CRUD
   - Added reviewRoutes.js with proper validation
   - Set up orderRoutes.js with authentication requirements

**Technical Details:**
- Implemented Joi validation for request data
- Added proper HTTP status codes (200, 201, 400, 401, 404, 500)
- Created middleware for error handling
- Set up test environment with supertest for HTTP testing

---

### [Team Member 2 Name]
**Week 6 Contributions:**

1. **Database Models and Schemas**
   - Created MongoDB schemas for Users, Products, Reviews collections
   - Implemented data validation at schema level
   - Set up proper indexing for performance
   - Created relationships between collections

2. **OAuth Implementation**
   - Integrated Google OAuth 2.0 authentication
   - Created auth routes (/auth/google, /auth/logout, /auth/callback)
   - Implemented session management
   - Added protected route middleware

---

### [Team Member 3 Name]
**Week 6 Contributions:**

1. **Deployment Configuration**
   - Set up Render deployment configuration
   - Configured environment variables for production
   - Created Dockerfile for containerization
   - Set up MongoDB Atlas connection

2. **Additional Collections**
   - Implemented Events collection with CRUD operations
   - Created RSVPs collection with proper validation
   - Added Organizations collection

---

### [Team Member 4 Name]
**Week 6 Contributions:**

1. **Testing and Quality Assurance**
   - Expanded test coverage for all collections
   - Implemented integration tests
   - Added test data seeding scripts
   - Created automated test runner

2. **Documentation**
   - Created API usage examples
   - Added setup instructions to README
   - Created deployment guide
   - Added troubleshooting documentation

---

## Week 6 Deliverables Checklist

### ✅ Completed
- [x] Four collections with full CRUD operations (Users, Products, Reviews, Orders)
- [x] Data validation on POST and PUT endpoints for all collections
- [x] OAuth implementation with Google authentication
- [x] Protected POST and PUT endpoints for at least two collections
- [x] Unit tests for GET endpoints on all four collections
- [x] Swagger documentation published at `/api-docs`
- [x] Individual contributions documented

### 🔄 In Progress
- [ ] Final deployment to Render
- [ ] Video demonstration recording
- [ ] Final testing on deployed environment

---

## How to Run Tests

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run specific test file
npm test -- tests/userRoutes.test.js

# Run tests with coverage
npm run test:coverage