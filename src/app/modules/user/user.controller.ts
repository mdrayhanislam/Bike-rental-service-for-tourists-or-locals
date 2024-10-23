/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
// import { catchAsync } from '../../utils/catchAsync';
import { UserServices } from './user.service';

const createAdmin = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.createAdminIntoDB(req.body);

    res.status(200).json({
      success: true,
      statusCode: 201,
      message: 'User Create successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    // console.log('test', req.user);
    const { userId } = req.params;
    const result = await UserServices.updateUser(userId, req.body);

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

export const userControllers = {
  createAdmin,
  updateUser,
};
