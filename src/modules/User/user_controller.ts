import { Request, Response } from "express";
import { UserServices } from "./user_services";
import { UserModel } from "./user_model";
import { orderSchema, userSchemaValidator } from "./user_validator";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const { error, value } = userSchemaValidator.validate(user);
    // console.log({ error }, { value });
    if (error) {
      res.status(400).json({
        success: false,
        message: "Somthing went wrong",
        error: error.details,
      });
    } else {
      const result = await UserServices.CreateUserToDB(value);
      res.status(200).json({
        success: true,
        message: "User created successfully!",
        data: result,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Somthing went wrong",
      error: error,
    });
  }
};

const editUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const { userId } = req.params;

    const User = new UserModel();
    const userData = await User.isExists(userId);
    console.log(userData);

    if (userData) {
      const { error } = await userSchemaValidator.validate(user);
      console.log(error);

      if (error) {
        res.status(400).json({
          success: false,
          message: "Somthing went wrong",
          error: error.details,
        });
      } else {
        const result = await UserServices.UpdateOneUser(userId, req.body);
        res.status(200).json({
          success: true,
          message: "User Updated",
          data: result,
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Somthing went wrong",
      error: error,
    });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.GetUsersFromDB();

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Somthing went wrong",
      error: error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const User = new UserModel();

    const userData = await User.isExists(userId);
    if (userData) {
      res.status(200).json({
        success: true,
        message: "Users fetched successfully",
        data: userData,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Somthing went wrong",
      error: error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const User = new UserModel();

    const userData = await User.isExists(userId);
    if (userData) {
      await UserServices.DeleteOneUser(userId);
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: null,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Somthing went wrong",
      error: error,
    });
  }
};

const addOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const User = new UserModel();
    const { error, value } = await orderSchema.validate(req.body);
    const userData = await User.isExists(userId);
    if (userData && !error) {
      await UserServices.addOrder(userId, value);
      res.status(200).json({
        success: true,
        message: "Order created successfully!",
        data: null,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Something Went wrong ",
        error: {
          code: 404,
          description: "Not inserted",
        },
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Somthing went wrong",
      error: error,
    });
  }
};

const getOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const User = new UserModel();
    const userData = await User.isExists(userId);
    if (userData) {
      const result = await UserServices.getOrderFromDB(userId);
      res.status(200).json({
        success: true,
        message: "Order fetched successfully!",
        data: result,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Something Went wrong ",
        error: {
          code: 404,
          description: "Something Went wrong",
        },
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Somthing went wrong",
      error: error,
    });
  }
};

const getTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const User = new UserModel();
    const userData = await User.isExists(userId);
    if (userData) {
      const result = await UserServices.GetTotalPriceOfOrders(userId);
      // console.log(result);
      res.status(200).json({
        success: true,
        message: "Total price calculated successfully!",
        data: result,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Something Went wrong ",
        error: {
          code: 404,
          description: "Something Went wrong",
        },
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Somthing went wrong",
      error: error,
    });
  }
};

export const UserController = {
  createUser,
  getUsers,
  editUser,
  getSingleUser,
  deleteUser,
  getOrder,
  addOrder,
  getTotalPrice,
};
