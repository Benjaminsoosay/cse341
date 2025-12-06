
import Order from '../models/Order.js';

export const getAllOrders = async (req, res) => {
    try {
        const { status, userId, startDate, endDate } = req.query;
        let filter = {};
        
        if (status) filter.status = status;
        if (userId) filter.user = userId;
        
        if (startDate || endDate) {
            filter.createdAt = {};
            if (startDate) filter.createdAt.$gte = new Date(startDate);
            if (endDate) filter.createdAt.$lte = new Date(endDate);
        }
        
        const orders = await Order.find(filter)
            .populate('user', 'name email')
            .populate('items.product', 'name price')
            .sort({ createdAt: -1 });
        
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching orders', 
            error: error.message 
        });
    }
};
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user', 'name email')
            .populate('items.product', 'name price sku');
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        res.status(200).json(order);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid order ID' });
        }
        res.status(500).json({ 
            message: 'Error fetching order', 
            error: error.message 
        });
    }
};

export const createOrder = async (req, res) => {
    try {
        const { user, items, shippingAddress, paymentMethod } = req.body;
        
        
        if (!user || !items || items.length === 0) {
            return res.status(400).json({ 
                message: 'User and at least one item are required' 
            });
        }
      
        let total = 0;
        const orderItems = [];
        
        for (const item of items) {
            if (!item.product || !item.quantity || item.quantity < 1) {
                return res.status(400).json({ 
                    message: 'Each item must have a product and valid quantity' 
                });
            }
          
            const itemPrice = item.price || 0;
            total += itemPrice * item.quantity;
            
            orderItems.push({
                product: item.product,
                quantity: item.quantity,
                priceAtTime: itemPrice
            });
        }
        
        const order = new Order({
            user,
            items: orderItems,
            total,
            shippingAddress,
            paymentMethod,
            status: 'pending'
        });
        
        const savedOrder = await order.save();
        
        
        const populatedOrder = await Order.findById(savedOrder._id)
            .populate('user', 'name email')
            .populate('items.product', 'name price');
        
        res.status(201).json(populatedOrder);
    } catch (error) {
        res.status(400).json({ 
            message: 'Error creating order', 
            error: error.message 
        });
    }
};


export const updateOrder = async (req, res) => {
    try {
        const { status } = req.body;
        
        if (status && !['pending', 'paid', 'shipped', 'delivered', 'cancelled'].includes(status)) {
            return res.status(400).json({ 
                message: 'Invalid status value' 
            });
        }
        
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('user', 'name email');
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        res.status(200).json(order);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid order ID' });
        }
        res.status(400).json({ 
            message: 'Error updating order', 
            error: error.message 
        });
    }
};


export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        res.status(200).json({ 
            message: 'Order deleted successfully',
            orderId: order._id 
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid order ID' });
        }
        res.status(500).json({ 
            message: 'Error deleting order', 
            error: error.message 
        });
    }
};

export default {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
};