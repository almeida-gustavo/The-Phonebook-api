import { inject, injectable } from 'tsyringe';
import IContactsRepository from '@modules/contacts/repositories/IContactsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IDeleteContactDTO from '../dtos/IDeleteContactDTO';

@injectable()
class DeleteContactService {
  constructor(
    @inject('ContactsRepository')
    private constactsRepository: IContactsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    contact_id,
  }: IDeleteContactDTO): Promise<void> {
    const contact = await this.constactsRepository.findByContactiD(contact_id);
    const user = await this.usersRepository.findById(user_id);

    if (!contact) {
      throw new AppError('This contact does not exists');
    }

    if (contact?.user_id !== user?.id) {
      throw new AppError(
        'You can not delete a contact you did not create',
        401,
      );
    }

    await this.constactsRepository.deleteContact(contact_id);
  }
}

export default DeleteContactService;
