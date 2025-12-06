
import Product from '../models/Product.js';


export const getAllProducts = async (req, res) => {
    try {
        const { category, minPrice, maxPrice, inStock, search } = req.query;
        let filter = { isActive: true };
        
        if (category) filter.category = category;
        
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }
        
        if (inStock === 'true') {
            filter.stock = { $gt: 0 };
        }
        
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { sku: { $regex: search, $options: 'i' } }
            ];
        }
        
        const products = await Product.find(filter).sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching products', 
            error: error.message 
        });
    }
};


export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        res.status(200).json(product);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid product ID' });
        }
        res.status(500).json({ 
            message: 'Error fetching product', 
            error: error.message 
        });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, sku, price, category, stock, description } = req.body;
        
        
        const errors = [];
        if (!name || name.trim().length < 2) {
            errors.push('Product name must be at least 2 characters');
        }
        if (!sku || sku.trim().length < 3) {
            errors.push('SKU must be at least 3 characters');
        }
        if (!price || isNaN(price) || price < 0) {
            errors.push('Valid price is required and must be non-negative');
        }
        if (!category) {
            errors.push('Category is required');
        }
        if (!stock || isNaN(stock) || stock < 0) {
            errors.push('Valid stock quantity is required and must be non-negative');
        }
        if (!description || description.trim().length < 10) {
            errors.push('Description must be at least 10 characters');
        }
        
        if (errors.length > 0) {
            return res.status(400).json({ 
                message: 'Validation failed', 
                errors 
            });
        }
        
        const product = new Product({
            name: name.trim(),
            sku: sku.trim().toUpperCase(),
            price: parseFloat(price),
            category,
            stock: parseInt(stock),
            description: description.trim(),
            isActive: true
        });
        
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
        
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ 
                message: 'Product with this SKU already exists' 
            });
        }
        res.status(400).json({ 
            message: 'Error creating product', 
            error: error.message 
        });
    }
}
export const updateProduct = async (req, res) => {
    try {
        const updates = req.body;
        
        
        if (updates.price !== undefined && (isNaN(updates.price) || updates.price < 0)) {
            return res.status(400).json({ 
                message: 'Price must be a valid non-negative number' 
            });
        }
        
        if (updates.stock !== undefined && (isNaN(updates.stock) || updates.stock < 0)) {
            return res.status(400).json({ 
                message: 'Stock must be a valid non-negative number' 
            });
        }
        
        if (updates.sku) {
            updates.sku = updates.sku.trim().toUpperCase();
        }
        
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            updates,
            { 
                new: true, 
                runValidators: true 
            }
        );
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        res.status(200).json(product);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid product ID' });
        }
        res.status(400).json({ 
            message: 'Error updating product', 
            error: error.message 
        });
    }
};


export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true }
        );
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        res.status(200).json({ 
            message: 'Product deactivated successfully',
            productId: product._id 
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid product ID' });
        }
        res.status(500).json({ 
            message: 'Error deleting product', 
            error: error.message 
        });
    }
};

export default {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};