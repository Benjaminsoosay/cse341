
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const orderRoutes = require('./routes/orderRoutes');
const { isAuthenticated, isAdmin } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
  mongoose.connection.db.listCollections().toArray()
    .then(collections => {
      console.log('\n📁 Collections in database:');
      collections.forEach(col => console.log(`   • ${col.name}`));
    })
    .catch(err => console.log('Could not list collections:', err.message));
})
.catch(err => {
  console.error('MongoDB connection error:', err.message);
});


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    httpOnly: true
  }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get('/auth/google', (req, res) => {
  req.session.user = {
    id: 'mock-user-123',
    name: 'Test User',
    email: 'test@example.com',
    role: 'user',
    authenticated: true
  };
  console.log('🔐 Mock authentication: User session created');
  res.redirect('/auth/success');
});

app.get('/auth/success', (req, res) => {
  if (req.session.user) {
    res.json({
      message: 'Authentication successful',
      user: req.session.user
    });
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

app.get('/auth/logout', (req, res) => {
  const userName = req.session.user?.name || 'User';
  req.session.destroy();
  res.json({ message: `${userName} logged out successfully` });
});


app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'CSE341 E-commerce API',
    student: 'Benjamin Soosay',
    version: '1.0.0',
    endpoints: {
      docs: '/api-docs',
      auth: '/auth/google',
      users: '/api/users',
      products: '/api/products',
      reviews: '/api/reviews',
      orders: '/api/orders'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/test-db', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' });
    }
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    const collectionsInfo = await Promise.all(
      collections.map(async col => ({
        name: col.name,
        count: await db.collection(col.name).countDocuments()
      }))
    );
    res.json({
      status: 'connected',
      database: mongoose.connection.name,
      collections: collectionsInfo
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    requestedUrl: req.originalUrl
  });
});

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: 'Validation Error', message: err.message });
  }
  if (err.message.includes('Unauthorized')) {
    return res.status(401).json({ error: 'Unauthorized', message: err.message });
  }
  res.status(err.status || 500).json({ error: 'Server Error', message: err.message });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 Swagger docs: http://localhost:${PORT}/api-docs`);
  console.log(`🔐 OAuth mock: http://localhost:${PORT}/auth/google`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  console.log(`💾 DB test: http://localhost:${PORT}/api/test-db`);
  console.log('\n' + '='.repeat(50));
});

module.exports = app;
