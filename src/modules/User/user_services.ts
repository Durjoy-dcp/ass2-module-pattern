import { User } from "./user_interface";
import { UserModel } from "./user_model";

const CreateUserToDB = async (user: User) => {
  const result = UserModel.create(user);
  return result;
};
export const UserServices = {
  CreateUserToDB,
};
