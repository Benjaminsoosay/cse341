import Joi from 'joi';

export const productCreateSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  sku: Joi.string().alphanum().min(3).max(20).required(),
  description: Joi.string().allow(''),
  category: Joi.string().min(2).max(50).required(),
  price: Joi.number().min(0).required(),
  stock: Joi.number().integer().min(0).required(),
  brand: Joi.string().allow(''),
  tags: Joi.array().items(Joi.string()),
  isActive: Joi.boolean()
});

export const productUpdateSchema = productCreateSchema.min(1);

export const orderCreateSchema = Joi.object({
  userId: Joi.string().hex().length(24).required(),
  items: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().hex().length(24).required(),
        quantity: Joi.number().integer().min(1).required(),
        price: Joi.number().min(0).required()
      })
    )
    .min(1)
    .required(),
  status: Joi.string().valid('pending', 'paid', 'shipped', 'delivered', 'cancelled'),
  total: Joi.number().min(0).required()
});

export const orderUpdateSchema = orderCreateSchema.min(1);

export const reviewCreateSchema = Joi.object({
  productId: Joi.string().hex().length(24).required(),
  userId: Joi.string().hex().length(24).required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().allow('')
});

export const reviewUpdateSchema = reviewCreateSchema.min(1);

export const userCreateSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid('user', 'admin')
});

export const userUpdateSchema = userCreateSchema.min(1);
