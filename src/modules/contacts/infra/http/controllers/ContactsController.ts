import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import FindContactsByName from '@modules/contacts/services/FindContactsByNameService';
import FindAllUserContactsService from '@modules/contacts/services/FindAllUserContactsService';
import CreateContactService from '@modules/contacts/services/CreateContactservice';
import DeleteContactService from '@modules/contacts/services/DeleteContactService';

export default class ContactsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const findAllContacts = container.resolve(FindAllUserContactsService);

    const contacts = await findAllContacts.execute(user_id);

    return response.json(classToClass(contacts));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const user_id = request.user.id;

    const findContacts = container.resolve(FindContactsByName);

    const contacts = await findContacts.execute({ name, user_id });

    return response.json(classToClass(contacts));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, type, value } = request.body;
    const user_id = request.user.id;

    const createContact = container.resolve(CreateContactService);

    const contact = await createContact.execute({ name, type, value, user_id });

    return response.json(classToClass(contact));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { contact_id } = request.params;
    const user_id = request.user.id;

    const deleteContact = container.resolve(DeleteContactService);

    const contact = await deleteContact.execute({ contact_id, user_id });

    return response.json(classToClass(contact));
  }
}
