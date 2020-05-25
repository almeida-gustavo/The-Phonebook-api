import { Router } from 'express';
import userRouter from '@modules/users/infra/http/routes/users.routes';
import sessionRouter from '@modules/users/infra/http/routes/session.routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/login', sessionRouter);

export default routes;
