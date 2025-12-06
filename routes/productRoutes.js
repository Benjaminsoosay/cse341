const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    try {
        const products = [
            { id: '1', name: 'Laptop', price: 999.99, category: 'electronics' },
            { id: '2', name: 'Mouse', price: 29.99, category: 'electronics' }
        ];
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Server Error', message: error.message });
    }
});

router.get('/:id', (req, res) => {
    try {
        const productId = req.params.id;
        const product = {
            id: productId,
            name: `Product ${productId}`,
            price: 49.99,
            category: 'general'
        };
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Server Error', message: error.message });
    }
});

router.post('/', (req, res) => {
    try {
        const { name, price } = req.body;
        
        if (!name || !price) {
            return res.status(400).json({ 
                error: 'Validation Error', 
                message: 'Name and price are required' 
            });
        }
        
        const newProduct = {
            id: Date.now().toString(),
            name,
            price,
            category: 'general'
        };
        
        res.status(201).json({
            message: 'Product created successfully',
            product: newProduct
        });
    } catch (error) {
        res.status(500).json({ error: 'Server Error', message: error.message });
    }
});

router.put('/:id', (req, res) => {
    try {
        const productId = req.params.id;
        const { name, price } = req.body;
        
        const updatedProduct = {
            id: productId,
            name: name || `Updated Product ${productId}`,
            price: price || 49.99,
            category: 'general'
        };
        
        res.status(200).json({
            message: 'Product updated successfully',
            product: updatedProduct
        });
    } catch (error) {
        res.status(500).json({ error: 'Server Error', message: error.message });
    }
});

router.delete('/:id', (req, res) => {
    try {
        const productId = req.params.id;
        res.status(200).json({
            message: `Product ${productId} deleted successfully`
        });
    } catch (error) {
        res.status(500).json({ error: 'Server Error', message: error.message });
    }
});

module.exports = router;
