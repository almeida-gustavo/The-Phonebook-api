import { inject, injectable } from 'tsyringe';
import IContactsRepository from '@modules/contacts/repositories/IContactsRepository';
import ICreateContactDTO from '@modules/contacts/dtos/ICreateContactDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import AppError from '@shared/errors/AppError';
import Contacts from '../infra/typeorm/entities/Contacts';

@injectable()
class CreateContactService {
  constructor(
    @inject('ContactsRepository')
    private constactsRepository: IContactsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    name,
    user_id,
    type,
    value,
  }: ICreateContactDTO): Promise<Contacts> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('This user does not exists');
    }

    if (!(type === 'email' || type === 'number')) {
      throw new AppError('Type can only be "email" or "number"');
    }

    const contact = await this.constactsRepository.createContact({
      name,
      value,
      user_id,
      type,
    });

    return contact;
  }
}

export default CreateContactService;
