const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    try {
        const orders = [
            { id: '1', userId: '1', total: 999.99, status: 'completed' },
            { id: '2', userId: '2', total: 59.98, status: 'pending' }
        ];
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Server Error', message: error.message });
    }
});

router.get('/:id', (req, res) => {
    try {
        const orderId = req.params.id;
        const order = {
            id: orderId,
            userId: '1',
            total: 999.99,
            status: 'completed'
        };
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Server Error', message: error.message });
    }
});

// POST create new order
router.post('/', (req, res) => {
    try {
        const { userId, items } = req.body;
        
        // Validation
        if (!userId || !items) {
            return res.status(400).json({ 
                error: 'Validation Error', 
                message: 'User ID and items are required' 
            });
        }
        
        const newOrder = {
            id: Date.now().toString(),
            userId,
            items,
            total: 99.99,
            status: 'pending'
        };
        
        res.status(201).json({
            message: 'Order created successfully',
            order: newOrder
        });
    } catch (error) {
        res.status(500).json({ error: 'Server Error', message: error.message });
    }
});

// PUT update order
router.put('/:id', (req, res) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body;
        
        const updatedOrder = {
            id: orderId,
            userId: '1',
            total: 999.99,
            status: status || 'processing'
        };
        
        res.status(200).json({
            message: 'Order updated successfully',
            order: updatedOrder
        });
    } catch (error) {
        res.status(500).json({ error: 'Server Error', message: error.message });
    }
});

// DELETE order
router.delete('/:id', (req, res) => {
    try {
        const orderId = req.params.id;
        res.status(200).json({
            message: `Order ${orderId} deleted successfully`
        });
    } catch (error) {
        res.status(500).json({ error: 'Server Error', message: error.message });
    }
});

module.exports = router;
