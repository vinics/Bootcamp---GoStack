import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

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
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

    const email = 'john.doe@example.com';
    const password = '123456';

    expect(
      authenticateUser.execute({ email, password })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

    const email = 'john.doe@example.com';
    const password = '123456';

    await createUser.execute({
      name: 'John Doe',
      email,
      password
    });

    expect(
      authenticateUser.execute({ email, password: 'wrong-password' })
    ).rejects.toBeInstanceOf(AppError);
  });
});
