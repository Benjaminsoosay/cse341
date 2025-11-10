const express = require('express');
const bodyParser = require('body-parser');
const { connectDB } = require('./data/database');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// CORS headers setup
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, x-key'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
    );
    next();
});

// Route handling
app.use('/', routes);

// Initialize database and start server
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Database is connected. App running on port ${port}`);
    });
}).catch((err) => {
    console.error('Database connection failed:', err);
});
