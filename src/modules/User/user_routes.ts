import express from "express";
import { UserController } from "./user_controller";

const router = express.Router();

router.post("/create-user", UserController.createUser);
router.get("/get-all-users", UserController.getUsers);
router.get("/:userId", UserController.getSingleUser);
router.post("/:userId", UserController.editUser);
router.delete("/:userId", UserController.deleteUser);
router.put("/:userId/orders", UserController.addOrder);

export const UserRoutes = router;
