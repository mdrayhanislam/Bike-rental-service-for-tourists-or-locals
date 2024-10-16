/* eslint-disable @typescript-eslint/no-explicit-any */
import { USER_Role } from '../user/user.constants';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';

const register = async (payload: TUser): Promise<any> => {
  //user existence check
  const user = await User.findOne({ email: payload.email });

  if (user) {
    throw new Error('User already exists');
  }

  //set user role
  payload.role = USER_Role.user;

  //create user
  const newUser = await User.create(payload);

  return newUser;
};

export const AuthServices = {
  register,
};
