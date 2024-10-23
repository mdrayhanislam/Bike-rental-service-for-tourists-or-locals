/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
// import { catchAsync } from '../../utils/catchAsync';
import { AuthServices } from './auth.service';
import { catchAsync } from '../../utils/catchAsync';

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.register(req.body);

  res.status(200).json({
    success: true,
    message: 'User registered successfully!',
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);
  res.status(200).json({
    success: true,
    message: 'User login successfully!',
    data: result,
  });
});

export const authControllers = {
  register,
  loginUser,
};
