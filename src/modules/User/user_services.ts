import { User } from "./user_interface";
import { UserModel } from "./user_model";

const CreateUserToDB = async (userData: User) => {
  const result = await UserModel.create(userData);

  const returnResult = await UserModel.findOne(
    { userId: result.userId },
    { password: 0, orders: 0, _id: 0 }
  );

  return returnResult;
};
const GetUsersFromDB = async () => {
  const result = await UserModel.find(
    {},
    {
      username: 1,
      fullName: 1,
      age: 1,
      email: 1,
      address: 1,
    }
  );
  console.log(result);

  return result;
};
export const UserServices = {
  CreateUserToDB,
  GetUsersFromDB,
};
