/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { USER_Role } from '../user/user.constants';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
// import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config';

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

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist

  const user = await User.isUserExistsByCustomId(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This User can not Found');
  }

  // //checking if the user is already deleted
  const isDeleted = user?.isDeleted;
  // console.log(userExtis);
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted');
  }

  const userStatus = user?.status;
  // console.log(userExtis);
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ');
  }

  //checking if the password is correct
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    //Access Granted: sent AccessToken, RefreshToken
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  }

  // create token and sent to the client

  const jwtPayload = {
    userId: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });

  return {
    accessToken,
  };
};

export const AuthServices = {
  register,
  loginUser,
};
