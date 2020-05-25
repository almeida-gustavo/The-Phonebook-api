import { getRepository, Repository } from 'typeorm';

import ICreateContactDTO from '@modules/contacts/dtos/ICreateContactDTO';
import IContactsRepositoryDTO from '@modules/contacts/repositories/IContactsRepository';
import Contacts from '../entities/Contacts';

class ContactsRepository implements IContactsRepositoryDTO {
  private ormRepository: Repository<Contacts>;

  constructor() {
    this.ormRepository = getRepository(Contacts);
  }

  public async findContactByName(
    user_id: string,
    contact_name: string,
  ): Promise<Contacts[]> {
    const contacts = await this.ormRepository.find({
      where: { user_id },
    });

    const filteredContacts = contacts.filter((contact) =>
      contact.name
        .toLocaleLowerCase()
        .includes(contact_name.toLocaleLowerCase()),
    );

    return filteredContacts;
  }

  public async findByContactiD(id: string): Promise<Contacts | undefined> {
    const contact = await this.ormRepository.findOne(id);

    return contact;
  }

  public async findAllContactsByUserId(user_id: string): Promise<Contacts[]> {
    const contacts = await this.ormRepository.find({ where: { user_id } });

    return contacts;
  }

  public async createContact(data: ICreateContactDTO): Promise<Contacts> {
    const contact = await this.ormRepository.create(data);

    await this.ormRepository.save(contact);

    return contact;
  }

  public async deleteContact(contatct_id: string): Promise<void> {
    await this.ormRepository.delete(contatct_id);
  }
}

export default ContactsRepository;
