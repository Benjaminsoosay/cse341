const request = require('supertest');
const express = require('express');
const orderRoutes = require('../routes/orderRoutes');

const app = express();
app.use(express.json());
app.use('/api/orders', orderRoutes);

describe('Order Routes Tests', () => {
  // Test GET /api/orders
  describe('GET /api/orders', () => {
    it('should return all orders with status 200 (with auth)', async () => {
      const response = await request(app)
        .get('/api/orders')
        .set('Authorization', 'Bearer mock-token')
        .expect(200);

      expect(response.body).toBeDefined();
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should return 401 without authentication', async () => {
      const response = await request(app)
        .get('/api/orders')
        .expect(401);

      expect(response.body.message).toBeDefined();
    });

    it('should filter orders by status', async () => {
      const response = await request(app)
        .get('/api/orders?status=paid')
        .set('Authorization', 'Bearer mock-token')
        .expect(200);

      expect(response.body).toBeDefined();
    });
  });

  // Test GET /api/orders/:id
  describe('GET /api/orders/:id', () => {
    it('should return an order by ID with status 200', async () => {
      const orderId = 'order123';
      const response = await request(app)
        .get(`/api/orders/${orderId}`)
        .set('Authorization', 'Bearer mock-token')
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.id).toBe(orderId);
    });

    it('should return 404 for non-existent order ID', async () => {
      const response = await request(app)
        .get('/api/orders/nonexistent123')
        .set('Authorization', 'Bearer mock-token')
        .expect(404);

      expect(response.body.message).toBeDefined();
    });
  });

  // Test POST /api/orders validation
  describe('POST /api/orders validation', () => {
    it('should return 400 for missing required fields', async () => {
      const invalidOrder = { userId: 'user123' }; // Missing eventId and items
      const response = await request(app)
        .post('/api/orders')
        .set('Authorization', 'Bearer mock-token')
        .send(invalidOrder)
        .expect(400);

      expect(response.body.message).toBeDefined();
    });

    it('should return 400 for empty items array', async () => {
      const invalidOrder = {
        userId: 'user123',
        eventId: 'event123',
        items: [] 
      };
      const response = await request(app)
        .post('/api/orders')
        .set('Authorization', 'Bearer mock-token')
        .send(invalidOrder)
        .expect(400);

      expect(response.body.message).toBeDefined();
    });
  });
});