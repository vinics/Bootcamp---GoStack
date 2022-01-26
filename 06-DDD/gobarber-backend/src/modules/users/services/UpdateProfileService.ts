import path from 'path';
import fs from 'fs';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import uploadConfig from '@config/upload';

import User from '../infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';

import { injectable, inject } from 'tsyringe';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
    ) {}


  public async execute({ user_id, name, email, password, old_password }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('User not found');

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) throw new AppError('Email already in use.');

    user.name = name;
    user.email = email;

    if (password && !old_password) throw new AppError('To perform this update the old password is required.');

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(old_password, user.password);

      if (!checkOldPassword) throw new AppError('Old password doesn\'t match.');
    }

    if (password) {
      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
