import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import Users from '../infra/typeorm/entities/User';

interface ILoginDTO {
  email: string;
  password: string;
}

interface IResponseDTO {
  user: Users;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: ILoginDTO): Promise<IResponseDTO> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Wrong combination of email and password', 401);
    }

    const passwordCheck = await this.hashProvider.compareHash(
      password,
      user?.password,
    );

    if (!passwordCheck) {
      throw new AppError('Wrong combination of email and password', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
