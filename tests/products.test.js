const request = require('supertest');
const express = require('express');
const productRoutes = require('../routes/productRoutes');

const app = express();
app.use(express.json());
app.use('/api/products', productRoutes);

describe('Product Routes Tests', () => {
  // Test GET /api/products
  describe('GET /api/products', () => {
    it('should return all products with status 200', async () => {
      const response = await request(app)
        .get('/api/products')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should filter products by category', async () => {
      const response = await request(app)
        .get('/api/products?category=merchandise')
        .expect(200);

      expect(response.body).toBeDefined();
    });

    it('should filter products by price range', async () => {
      const response = await request(app)
        .get('/api/products?minPrice=10&maxPrice=50')
        .expect(200);

      expect(response.body).toBeDefined();
    });
  });

  // Test GET /api/products/:id
  describe('GET /api/products/:id', () => {
    it('should return a product by ID with status 200', async () => {
      const productId = 'prod123';
      const response = await request(app)
        .get(`/api/products/${productId}`)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.id).toBe(productId);
    });

    it('should return 404 for non-existent product ID', async () => {
      const response = await request(app)
        .get('/api/products/nonexistent123')
        .expect(404);

      expect(response.body.message).toBeDefined();
    });
  });

  // Test POST /api/products validation
  describe('POST /api/products validation', () => {
    it('should return 400 for missing required fields', async () => {
      const invalidProduct = { description: 'Test product' }; // Missing name and price
      const response = await request(app)
        .post('/api/products')
        .send(invalidProduct)
        .expect(400);

      expect(response.body.message).toBeDefined();
    });

    it('should return 400 for invalid price (negative)', async () => {
      const invalidProduct = {
        name: 'Test Product',
        price: -10, 
        category: 'merchandise'
      };
      const response = await request(app)
        .post('/api/products')
        .send(invalidProduct)
        .expect(400);

      expect(response.body.message).toBeDefined();
    });
  });
});