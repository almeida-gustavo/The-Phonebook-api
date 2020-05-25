import Contacts from '../infra/typeorm/entities/Contacts';
import ICreateContactDTO from '../dtos/ICreateContactDTO';

export default interface IContactsRepository {
  findContactByName(user_id: string, contact_name: string): Promise<Contacts[]>;
  findAllContactsByUserId(user_id: string): Promise<Contacts[]>;
  findByContactiD(id: string): Promise<Contacts | undefined>;
  createContact(data: ICreateContactDTO): Promise<Contacts>;
  deleteContact(contatct_id: string): Promise<void>;
}
