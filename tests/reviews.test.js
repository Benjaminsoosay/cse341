const request = require('supertest');
const express = require('express');
const reviewRoutes = require('../routes/reviewRoutes');

const app = express();
app.use(express.json());
app.use('/api/reviews', reviewRoutes);

describe('Review Routes Tests', () => {
  // Test GET /api/reviews
  describe('GET /api/reviews', () => {
    it('should return all reviews with status 200', async () => {
      const response = await request(app)
        .get('/api/reviews')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should filter reviews by productId', async () => {
      const productId = 'prod123';
      const response = await request(app)
        .get(`/api/reviews?productId=${productId}`)
        .expect(200);

      expect(response.body).toBeDefined();
    });

    it('should filter reviews by minRating', async () => {
      const response = await request(app)
        .get('/api/reviews?minRating=4')
        .expect(200);

      expect(response.body).toBeDefined();
    });
  });

  // Test GET /api/reviews/:id
  describe('GET /api/reviews/:id', () => {
    it('should return a review by ID with status 200', async () => {
      const reviewId = 'rev123';
      const response = await request(app)
        .get(`/api/reviews/${reviewId}`)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.id).toBe(reviewId);
    });

    it('should return 404 for non-existent review ID', async () => {
      const response = await request(app)
        .get('/api/reviews/nonexistent123')
        .expect(404);

      expect(response.body.message).toBeDefined();
    });
  });

  // Test POST /api/reviews validation
  describe('POST /api/reviews validation', () => {
    it('should return 400 for missing required fields', async () => {
      const invalidReview = { comment: 'Great!' }; // Missing productId and rating
      const response = await request(app)
        .post('/api/reviews')
        .send(invalidReview)
        .expect(400);

      expect(response.body.message).toBeDefined();
    });

    it('should return 400 for invalid rating (out of range)', async () => {
      const invalidReview = {
        productId: 'prod123',
        rating: 6,
        comment: 'Test review'
      };
      const response = await request(app)
        .post('/api/reviews')
        .send(invalidReview)
        .expect(400);

      expect(response.body.message).toBeDefined();
    });
  });
});