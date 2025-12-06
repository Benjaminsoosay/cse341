import mongoose from 'mongoose';
import Review from '../models/Review.js';


export const getAllReviews = async (req, res) => {
  try {
    const { productId, userId, minRating } = req.query;
    let filter = {};

    if (productId) filter.product = productId;
    if (userId) filter.user = userId;
    if (minRating) filter.rating = { $gte: Number(minRating) };

    const reviews = await Review.find(filter)
      .populate('user', 'name avatar')
      .populate('product', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching reviews',
      error: error.message
    });
  }
}; 
export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('user', 'name avatar')
      .populate('product', 'name price');

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json(review);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid review ID' });
    }
    res.status(500).json({
      message: 'Error fetching review',
      error: error.message
    });
  }
};

// Create review
export const createReview = async (req, res) => {
  try {
    const { user, product, rating, comment } = req.body;

    if (!user || !product || !rating || !comment) {
      return res.status(400).json({
        message: 'User, product, rating, and comment are required'
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        message: 'Rating must be between 1 and 5'
      });
    }

    if (comment.trim().length < 5) {
      return res.status(400).json({
        message: 'Comment must be at least 5 characters'
      });
    }

    const review = new Review({
      user,
      product,
      rating,
      comment: comment.trim()
    });

    const savedReview = await review.save();

    const populatedReview = await Review.findById(savedReview._id)
      .populate('user', 'name avatar')
      .populate('product', 'name');

    res.status(201).json(populatedReview);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: 'You have already reviewed this product'
      });
    }
    res.status(400).json({
      message: 'Error creating review',
      error: error.message
    });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({
        message: 'Rating must be between 1 and 5'
      });
    }

    if (comment && comment.trim().length < 5) {
      return res.status(400).json({
        message: 'Comment must be at least 5 characters'
      });
    }

    const review = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('user', 'name avatar');

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json(review);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid review ID' });
    }
    res.status(400).json({
      message: 'Error updating review',
      error: error.message
    });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({
      message: 'Review deleted successfully',
      reviewId: review._id
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid review ID' });
    }
    res.status(500).json({
      message: 'Error deleting review',
      error: error.message
    });
  }
};


export const getProductRating = async (req, res) => {
  try {
    const productId = req.params.productId;

    const result = await Review.aggregate([
      { $match: { product: new mongoose.Types.ObjectId(productId) } },
      {
        $group: {
          _id: '$product',
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 },
          ratings: { $push: '$rating' }
        }
      }
    ]);

    if (result.length === 0) {
      return res.status(200).json({
        productId,
        averageRating: 0,
        totalReviews: 0,
        ratings: []
      });
    }

    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json({
      message: 'Error calculating product rating',
      error: error.message
    });
  }
};

export default {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  getProductRating
};
