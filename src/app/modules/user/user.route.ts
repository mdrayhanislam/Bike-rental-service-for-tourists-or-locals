import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

router.post('/create-admin', userControllers.createAdmin);

//update
router.put('/:userId', userControllers.updateUser);

export const UserRoutes = router;
