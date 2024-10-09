import { USER_Role, USER_STATUS } from './user.constants';

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: keyof typeof USER_Role;
  status: keyof typeof USER_STATUS;
  passwordChangedAt?: Date;
};
