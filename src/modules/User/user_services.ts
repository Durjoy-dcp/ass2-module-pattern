import { User } from "./user_interface";
import { UserModel } from "./user_model";

const CreateUserToDB = async (userData: User) => {
  const result = await UserModel.create(userData);

  const returnResult = await UserModel.findOne(
    { userId: result.userId },
    { password: 0 }
  );

  return returnResult;
};
export const UserServices = {
  CreateUserToDB,
};
