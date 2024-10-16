import { catchAsync } from '../../utils/catchAsync';
import { AuthServices } from './auth.service';

const register = catchAsync(async (req, res) => {
  const result = await AuthServices.register(req.body);

  res.status(200).json({
    success: true,
    message: 'User registered successfully!',
    data: result,
  });
});

export const authControllers = {
  register,
};
