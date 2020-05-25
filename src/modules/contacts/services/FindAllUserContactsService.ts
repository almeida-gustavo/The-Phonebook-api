import { inject, injectable } from 'tsyringe';
import IContactsRepository from '@modules/contacts/repositories/IContactsRepository';

// import AppError from '@shared/errors/AppError';
import Contacts from '../infra/typeorm/entities/Contacts';

@injectable()
class FindAllUserContactsService {
  constructor(
    @inject('ContactsRepository')
    private constactsRepository: IContactsRepository,
  ) {}

  public async execute(user_id: string): Promise<Contacts[]> {
    const contacts = await this.constactsRepository.findAllContactsByUserId(
      user_id,
    );

    return contacts;
  }
}

export default FindAllUserContactsService;
