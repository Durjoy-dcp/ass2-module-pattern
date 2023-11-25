import { Schema, model, connect } from "mongoose";
import { Order, User, UsermethodModel, Usermethods } from "./user_interface";

const orderSchema = new Schema<Order>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new Schema<User, UsermethodModel, Usermethods>({
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
userSchema.method("isExists", async function (id: number) {
  const existingUser = await UserModel.findOne(
    { userId: id },
    { _id: 0, password: 0, age: 0, orders: 0 }
  );
  return existingUser;
});

export const UserModel = model<User, UsermethodModel>("User", userSchema);
