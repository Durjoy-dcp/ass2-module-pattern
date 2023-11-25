import { Schema, model, connect } from "mongoose";

export type Order = {
  productName: string;
  price: number;
  quantity: number;
};

export type User = {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  email: string;
  isActive: boolean;
  address: {
    street: string;
    city: string;
    country: string;
  };
  hobbies: string[];
  orders: Order[];
};
