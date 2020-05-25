import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import EnsureAuthentication from '@modules/users/middlewares/EnsureAuthentication';
import ContactsController from '../controllers/ContactsController';

const contactsRouter = Router();
const contactsController = new ContactsController();

contactsRouter.use(EnsureAuthentication);

contactsRouter.get('/', contactsController.index);
contactsRouter.get('/name', contactsController.show);
contactsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      type: Joi.string().required(),
      value: Joi.string().required(),
    },
  }),
  contactsController.create,
);
contactsRouter.delete('/:contact_id', contactsController.delete);

export default contactsRouter;
