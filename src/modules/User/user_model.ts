import { Schema, model, connect } from "mongoose";
import { Order, User } from "./user_interface";

const orderSchema = new Schema<Order>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new Schema<User>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  age: { type: Number, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  hobbies: { type: [String], required: true },
  orders: { type: [orderSchema], default: [] },
});
export const UserModel = model<User>("User", userSchema);
