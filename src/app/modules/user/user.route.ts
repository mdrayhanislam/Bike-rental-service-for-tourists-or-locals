import express from 'express';
import { userControllers } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_Role } from './user.constants';

const router = express.Router();

router.post(
  '/create-admin',
  auth(USER_Role.admin, 'super_admin'),
  userControllers.createAdmin,
);

//update
router.put('/:userId', auth(USER_Role.admin), userControllers.updateUser);

export const UserRoutes = router;
