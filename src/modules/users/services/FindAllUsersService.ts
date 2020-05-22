import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

import Users from '../infra/typeorm/entities/User';

@injectable()
class FindAllUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<Users[]> {
    const users = await this.usersRepository.getAll();

    return users;
  }
}

export default FindAllUsersService;
