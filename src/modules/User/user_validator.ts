import Joi from "joi";
import { Order, User } from "./user_interface";
export const orderSchema = Joi.object<Order>({
  productName: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
});

export const userSchemaValidator = Joi.object<User>({
  userId: Joi.number().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  fullName: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  }).required(),
  email: Joi.string().email().required(),
  isActive: Joi.boolean().required(),
  age: Joi.number().required(),
  address: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
  }).required(),
  hobbies: Joi.array().items(Joi.string()).required(),
  orders: Joi.array().items(orderSchema),
});
