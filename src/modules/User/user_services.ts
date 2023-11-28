import { Order, User } from "./user_interface";
import { UserModel } from "./user_model";

const CreateUserToDB = async (userData: User) => {
  const result = await UserModel.create(userData);

  const returnResult = await UserModel.findOne(
    { userId: result.userId },
    { password: 0, orders: 0, _id: 0 }
  );

  return returnResult;
};
const GetUsersFromDB = async () => {
  const result = await UserModel.find(
    {},
    {
      username: 1,
      fullName: 1,
      age: 1,
      email: 1,
      address: 1,
    }
  );

  return result;
};
const GetSingleUserFromDB = async (userId: string) => {
  const result = await UserModel.findOne(
    { userId },
    {
      username: 1,
      fullName: 1,
      age: 1,
      email: 1,
      address: 1,
    }
  );

  return result;
};

const UpdateOneUser = async (userId: string, user: User) => {
  await UserModel.updateOne({ userId: userId }, { $set: user });

  const returnResult = await UserModel.findOne(
    { userId: userId },
    { password: 0, orders: 0, _id: 0 }
  );
  // console.log(result);
  return returnResult;
};
const DeleteOneUser = async (userId: string) => {
  const result = await UserModel.deleteOne({ userId: userId });

  // console.log(result);
  return result;
};

const addOrder = async (userId: string, order: Order) => {
  const result = await UserModel.updateOne(
    { userId: userId },
    { $addToSet: { orders: order } }
  );
  return result;
};
const getOrderFromDB = async (userId: string) => {
  const result = await UserModel.findOne(
    { userId: userId },
    { orders: 1, _id: 0 }
  );
  return result;
};
const GetTotalPriceOfOrders = async (userId: string) => {
  // const numberUserId=parseInt
  const result = await UserModel.aggregate([
    { $match: { userId: parseInt(userId) } },
    {
      $unwind: "$orders",
    },

    {
      $group: {
        _id: "$userId",
        totalPrice: {
          $sum: { $multiply: ["$orders.price", "$orders.quantity"] },
        },
      },
    },
    {
      $project: { totalPrice: 1, _id: 0 },
    },
  ]);
  return result;
};

export const UserServices = {
  CreateUserToDB,
  GetUsersFromDB,
  GetTotalPriceOfOrders,
  GetSingleUserFromDB,
  UpdateOneUser,
  DeleteOneUser,
  addOrder,
  getOrderFromDB,
};
