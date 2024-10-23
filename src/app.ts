import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';
import { AuthRoutes } from './app/modules/auth/auth.route';
import notFound from './app/middlewares/notFound';

app.use(express.json());
app.use(cors());

app.use('/api/auth', AuthRoutes);
app.use('/api/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  const a = 'Bike Rental!';
  res.send(a);
});
//Not Found
app.use(notFound);
export default app;
