import { Router } from 'express';
import Review from '../models/Review.js';
import { reviewCreateSchema, reviewUpdateSchema } from '../validation/schemas.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.find().lean();
    res.json(reviews);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id).lean();
    if (!review) return res.status(404).json({ error: 'Review not found' });
    res.json(review);
  } catch (err) {
    next(err);
  }
});

router.post('/', requireAuth, async (req, res, next) => {
  try {
    const { error, value } = reviewCreateSchema.validate({ ...req.body, userId: req.user._id });
    if (error) return res.status(400).json({ error: error.message });

    const existing = await Review.findOne({ productId: value.productId, userId: req.user._id });
    if (existing) return res.status(400).json({ error: 'You already reviewed this product' });

    const review = await Review.create(value);
    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', requireAuth, async (req, res, next) => {
  try {
    const { error, value } = reviewUpdateSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });

    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ error: 'Review not found' });

    if (String(review.userId) !== String(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    Object.assign(review, value);
    await review.save();
    res.json(review);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ error: 'Review not found' });

    if (String(review.userId) !== String(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    await review.deleteOne();
    res.json({ message: 'Review deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;
