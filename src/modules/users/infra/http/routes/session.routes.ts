import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import SessionController from '../controllers/SessionController';

const sessionRouter = Router();
const sessionController = new SessionController();

sessionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  sessionController.create,
);

export default sessionRouter;
