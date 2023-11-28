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
exports.UserController = void 0;
const user_services_1 = require("./user_services");
const user_model_1 = require("./user_model");
const user_validator_1 = require("./user_validator");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req.body;
        const { error, value } = user_validator_1.userSchemaValidator.validate(user);
        // console.log({ error }, { value });
        if (error) {
            res.status(400).json({
                success: false,
                message: "Somthing went wrong",
                error: error.details,
            });
        }
        else {
            const result = yield user_services_1.UserServices.CreateUserToDB(value);
            res.status(200).json({
                success: true,
                message: "User created successfully!",
                data: result,
            });
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Somthing went wrong",
            error: error,
        });
    }
});
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req.body;
        const { userId } = req.params;
        const User = new user_model_1.UserModel();
        const userData = yield User.isExists(userId);
        if (userData) {
            const { error } = yield user_validator_1.userSchemaValidator.validate(user);
            if (error) {
                res.status(400).json({
                    success: false,
                    message: "Somthing went wrong",
                    error: error.details,
                });
            }
            else {
                user_services_1.UserServices.UpdateOneUser(userId, req.body.user);
                res.status(200).json({
                    success: true,
                    message: "User Updated",
                });
            }
        }
        else {
            res.status(400).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Somthing went wrong",
            error: error,
        });
    }
});
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_services_1.UserServices.GetUsersFromDB();
        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Somthing went wrong",
            error: error,
        });
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const User = new user_model_1.UserModel();
        const userData = yield User.isExists(userId);
        if (userData) {
            res.status(200).json({
                success: true,
                message: "Users fetched successfully",
                data: userData,
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Somthing went wrong",
            error: error,
        });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const User = new user_model_1.UserModel();
        const userData = yield User.isExists(userId);
        if (userData) {
            yield user_services_1.UserServices.DeleteOneUser(userId);
            res.status(200).json({
                success: true,
                message: "User deleted successfully",
                data: null,
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Somthing went wrong",
            error: error,
        });
    }
});
const addOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const User = new user_model_1.UserModel();
        const { error, value } = yield user_validator_1.orderSchema.validate(req.body);
        const userData = yield User.isExists(userId);
        if (userData && !error) {
            yield user_services_1.UserServices.addOrder(userId, value);
            res.status(200).json({
                success: true,
                message: "Order created successfully!",
                data: null,
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: "Something Went wrong ",
                error: {
                    code: 404,
                    description: "Not inserted",
                },
            });
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Somthing went wrong",
            error: error,
        });
    }
});
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const User = new user_model_1.UserModel();
        const userData = yield User.isExists(userId);
        if (userData) {
            const result = yield user_services_1.UserServices.getOrderFromDB(userId);
            res.status(200).json({
                success: true,
                message: "Order fetched successfully!",
                data: result,
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: "Something Went wrong ",
                error: {
                    code: 404,
                    description: "Something Went wrong",
                },
            });
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Somthing went wrong",
            error: error,
        });
    }
});
const getTotalPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const User = new user_model_1.UserModel();
        const userData = yield User.isExists(userId);
        if (userData) {
            const result = yield user_services_1.UserServices.GetTotalPriceOfOrders(userId);
            // console.log(result);
            res.status(200).json({
                success: true,
                message: "Total price calculated successfully!",
                data: result,
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: "Something Went wrong ",
                error: {
                    code: 404,
                    description: "Something Went wrong",
                },
            });
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Somthing went wrong",
            error: error,
        });
    }
});
exports.UserController = {
    createUser,
    getUsers,
    editUser,
    getSingleUser,
    deleteUser,
    getOrder,
    addOrder,
    getTotalPrice,
};
