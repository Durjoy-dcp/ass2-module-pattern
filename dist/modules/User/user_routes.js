"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user_controller");
const router = express_1.default.Router();
router.post("/create-user", user_controller_1.UserController.createUser);
router.get("/get-all-users", user_controller_1.UserController.getUsers);
router.get("/:userId", user_controller_1.UserController.getSingleUser);
router.post("/:userId", user_controller_1.UserController.editUser);
router.delete("/:userId", user_controller_1.UserController.deleteUser);
router.put("/:userId/orders", user_controller_1.UserController.addOrder);
router.get("/:userId/orders", user_controller_1.UserController.getOrder);
router.get("/:userId/orders/total-price", user_controller_1.UserController.getTotalPrice);
exports.UserRoutes = router;
