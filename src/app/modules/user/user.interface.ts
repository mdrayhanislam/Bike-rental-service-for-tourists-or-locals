/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_Role, USER_STATUS } from './user.constants';

export interface TUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: keyof typeof USER_Role;
  status: keyof typeof USER_STATUS;
  passwordChangedAt?: Date;
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  // myStaticMethod(): number;

  isUserExistsByCustomId(email: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
