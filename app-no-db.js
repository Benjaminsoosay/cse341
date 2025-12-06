// app-no-db.js - Simple version without database
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/orders', orderRoutes);

// Basic route
app.get('/', (req, res) => {
    res.json({ 
        message: 'CSE341 Team 16 API',
        version: '1.0.0',
        status: 'Running without database (for testing)',
        documentation: '/api-docs',
        endpoints: [
            '/api/users',
            '/api/products',
            '/api/reviews',
            '/api/orders',
            '/api-docs'
        ]
    });
});

// Test all endpoints
app.get('/test', (req, res) => {
    res.json({
        message: 'Test endpoint',
        timestamp: new Date().toISOString(),
        status: 'All routes should be working'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ 
        error: 'Route not found'
    });
});

// Start server
app.listen(port, () => {
    console.log(`🚀 Server running on port ${port} (no database)`);
    console.log(`📚 Swagger docs: http://localhost:${port}/api-docs`);
    console.log(`✅ Test the API at:`);
    console.log(`   http://localhost:${port}/api/users`);
    console.log(`   http://localhost:${port}/api/products`);
});
