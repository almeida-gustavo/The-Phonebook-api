import { container } from 'tsyringe';

import './providers';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import ContactsRepository from '@modules/contacts/infra/typeorm/repositories/ContactsRepository';
import IContactsRepository from '@modules/contacts/repositories/IContactsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IContactsRepository>(
  'ContactsRepository',
  ContactsRepository,
);
