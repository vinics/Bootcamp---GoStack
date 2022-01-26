import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
   fakeUsersRepository = new FakeUsersRepository();
   fakeHashProvider = new FakeHashProvider();
   createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
   authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to authenticate', async () => {

    const email = 'john.doe@example.com';
    const password = '123456';

    const user = await createUser.execute({
      name: 'John Doe',
      email,
      password
    });

    const response = await authenticateUser.execute({
      email,
      password
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should NOT be able to authenticate with non-existing user', async () => {

    const email = 'john.doe@example.com';
    const password = '123456';

    await expect(
      authenticateUser.execute({ email, password })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to authenticate with wrong password', async () => {

    const email = 'john.doe@example.com';
    const password = '123456';

    await createUser.execute({
      name: 'John Doe',
      email,
      password
    });

    await expect(
      authenticateUser.execute({ email, password: 'wrong-password' })
    ).rejects.toBeInstanceOf(AppError);
  });
});
