import { Request, Response } from "express";
import { UserServices } from "./user_services";

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const result = UserServices.CreateUserToDB(user);

    res.status(200).json({
      success: true,
      message: "User is created succesfully",
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: "Somthing went wrong",
      error: error,
    });
  }
};

export const UserController = {
  createUser,
};
