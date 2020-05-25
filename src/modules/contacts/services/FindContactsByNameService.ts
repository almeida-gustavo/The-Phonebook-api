import { inject, injectable } from 'tsyringe';
import IContactsRepository from '@modules/contacts/repositories/IContactsRepository';
import IFindContactByNameDTO from '@modules/contacts/dtos/IFindContactByNameDTO';

// import AppError from '@shared/errors/AppError';
import Contacts from '../infra/typeorm/entities/Contacts';

@injectable()
class FindContactsByNameService {
  constructor(
    @inject('ContactsRepository')
    private constactsRepository: IContactsRepository,
  ) {}

  public async execute({
    name,
    user_id,
  }: IFindContactByNameDTO): Promise<Contacts[]> {
    const contacts = await this.constactsRepository.findContactByName(
      user_id,
      name,
    );

    return contacts;
  }
}

export default FindContactsByNameService;
