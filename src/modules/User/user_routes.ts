import express from "express";
import { UserController } from "./user_controller";

const router = express.Router();

router.post("/create-user", UserController.createUser);
router.get("/get-all-users", UserController.getUsers);
router.get("/:userId", UserController.getSingleUser);
router.post("/:userId", UserController.editUser);
router.delete("/:userId", UserController.deleteUser);
router.put("/:userId/orders", UserController.addOrder);
router.get("/:userId/orders", UserController.getOrder);
router.get("/:userId/orders/total-price", UserController.getTotalPrice);

export const UserRoutes = router;
