const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    try {
        const reviews = [
            { id: '1', productId: '1', userId: '1', userName: 'John Doe', rating: 5 },
            { id: '2', productId: '2', userId: '2', userName: 'Jane Smith', rating: 4 }
        ];
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: 'Server Error', message: error.message });
    }
});

router.get('/:id', (req, res) => {
    try {
        const reviewId = req.params.id;
        const review = {
            id: reviewId,
            productId: '1',
            userId: '1',
            userName: 'John Doe',
            rating: 5
        };
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ error: 'Server Error', message: error.message });
    }
});

router.post('/', (req, res) => {
    try {
        const { productId, rating } = req.body;
        
        
        if (!productId || !rating) {
            return res.status(400).json({ 
                error: 'Validation Error', 
                message: 'Product ID and rating are required' 
            });
        }
        
        const newReview = {
            id: Date.now().toString(),
            productId,
            userId: '1',
            userName: 'Test User',
            rating
        };
        
        res.status(201).json({
            message: 'Review created successfully',
            review: newReview
        });
    } catch (error) {
        res.status(500).json({ error: 'Server Error', message: error.message });
    }
});

router.put('/:id', (req, res) => {
    try {
        const reviewId = req.params.id;
        const { rating } = req.body;
        
        const updatedReview = {
            id: reviewId,
            productId: '1',
            userId: '1',
            userName: 'John Doe',
            rating: rating || 4
        };
        
        res.status(200).json({
            message: 'Review updated successfully',
            review: updatedReview
        });
    } catch (error) {
        res.status(500).json({ error: 'Server Error', message: error.message });
    }
});

router.delete('/:id', (req, res) => {
    try {
        const reviewId = req.params.id;
        res.status(200).json({
            message: `Review ${reviewId} deleted successfully`
        });
    } catch (error) {
        res.status(500).json({ error: 'Server Error', message: error.message });
    }
});

module.exports = router;
