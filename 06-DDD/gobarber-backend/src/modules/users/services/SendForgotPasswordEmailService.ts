import User from '../infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

import { injectable, inject } from 'tsyringe';

interface IRequest {
  email: string;
}

@injectable()
class SendFOrgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    ) {}

  public async execute({ email }: IRequest): Promise<void> {}
}

export default SendFOrgotPasswordEmailService;
