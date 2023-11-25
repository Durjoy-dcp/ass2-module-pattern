import { Request, Response } from "express";
import { UserServices } from "./user_services";
import userSchemaValidator from "./user_validator";

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const { error, value } = userSchemaValidator.validate(user);
    console.log({ error }, { value });
    if (error) {
      res.status(500).json({
        success: false,
        message: "Somthing went wrong",
        error: error.details,
      });
    } else {
      const result = await UserServices.CreateUserToDB(value);
      res.status(200).json({
        success: true,
        message: "User is created succesfully",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Somthing went wrong",
      error: error,
    });
  }
};

export const UserController = {
  createUser,
};
