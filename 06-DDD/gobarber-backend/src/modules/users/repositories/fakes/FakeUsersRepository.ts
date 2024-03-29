import { uuid } from 'uuidv4';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findAllProviders(data: IFindAllProvidersDTO): Promise<User[]> {
    let { users } = this;
    if (data.excludeUserId)
      users = this.users.filter(user => user.id !== data.excludeUserId);

    return users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const foundUser = this.users.find(user => user.id === id);

    return foundUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const foundUser = this.users.find(user => user.email === email);

    return foundUser;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const newUser = new User();

    Object.assign(newUser, { id: uuid() }, userData);

    this.users.push(newUser);

    return newUser;
  }

  public async save(user: User): Promise<User> {
    const foundIndex = this.users.findIndex(
      foundUser => foundUser.id === user.id,
    );
    this.users[foundIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;
