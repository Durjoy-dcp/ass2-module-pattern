"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const user_model_1 = require("./user_model");
const CreateUserToDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.create(userData);
    const returnResult = yield user_model_1.UserModel.findOne({ userId: result.userId }, { password: 0, orders: 0, _id: 0 });
    return returnResult;
});
const GetUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.find({}, {
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
    });
    return result;
});
const GetSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findOne({ userId }, {
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
    });
    return result;
});
const UpdateOneUser = (userId, user) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.UserModel.updateOne({ userId: userId }, { $set: user });
    const returnResult = yield user_model_1.UserModel.findOne({ userId: userId }, { password: 0, orders: 0, _id: 0 });
    // console.log(result);
    return returnResult;
});
const DeleteOneUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.deleteOne({ userId: userId });
    // console.log(result);
    return result;
});
const addOrder = (userId, order) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.updateOne({ userId: userId }, { $addToSet: { orders: order } });
    return result;
});
const getOrderFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findOne({ userId: userId }, { orders: 1, _id: 0 });
    return result;
});
const GetTotalPriceOfOrders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // const numberUserId=parseInt
    const result = yield user_model_1.UserModel.aggregate([
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
});
exports.UserServices = {
    CreateUserToDB,
    GetUsersFromDB,
    GetTotalPriceOfOrders,
    GetSingleUserFromDB,
    UpdateOneUser,
    DeleteOneUser,
    addOrder,
    getOrderFromDB,
};
