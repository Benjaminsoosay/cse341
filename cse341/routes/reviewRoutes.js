
import express from 'express';
import reviewController from '../controllers/reviewController.js';

const router = express.Router();

router.get('/', reviewController.getAllReviews);
router.get('/:id', reviewController.getReviewById);
router.post('/', reviewController.createReview);
router.put('/:id', reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);
router.get('/product/:productId/rating', reviewController.getProductRating);

export default router;