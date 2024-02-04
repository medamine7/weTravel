import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import * as mongoose from 'mongoose';
import { UpdateUserInput } from './dto/update-user.input';
import { faker } from '@faker-js/faker';
import { Role } from 'src/constants/roles.enum';

const createUserInput: CreateUserInput = {
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  role: Role.USER,
};

const userId = new mongoose.Types.ObjectId();
const updateUserInput: UpdateUserInput = {
  id: userId.toString(),
  name: faker.person.fullName(),
};

describe('UsersResolver', () => {
  let resolver: UsersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(() => {
              return {
                _id: userId,
                ...createUserInput,
              };
            }),
            findAll: jest.fn(() => {
              return [
                {
                  _id: userId,
                  ...createUserInput,
                },
              ];
            }),
            getUsers: jest.fn(() => {
              return {
                users: [
                  {
                    _id: userId,
                    ...createUserInput,
                  },
                ],
                count: 1,
              };
            }),
            findOne: jest.fn(() => {
              return {
                _id: userId,
                ...createUserInput,
              };
            }),
            update: jest.fn(() => {
              return {
                _id: userId,
                ...createUserInput,
                ...updateUserInput,
              };
            }),
            remove: jest.fn(() => {
              return {};
            }),
          },
        },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should be able to create an user', async () => {
    const user = await resolver.createUser(createUserInput);
    expect(user._id).toBeDefined();
    expect(user._id).toBe(userId);
    expect(user.name).toBe(createUserInput.name);
    expect(user.email).toBe(createUserInput.email);
    expect(user.role).toBe(createUserInput.role);
  });
  it('should be able to find one user by id', async () => {
    const user = await resolver.findOne(userId.toString());
    expect(user).toBeDefined();
    expect(user._id).toBe(userId);
  });
  it('should be able to test updateUser ', async () => {
    const updatedUser = await resolver.updateUser(updateUserInput);
    expect(updatedUser).toBeDefined();
    expect(updatedUser.name).toBe(updateUserInput.name);
  });
  it('should be able to test removeUser ', async () => {
    const removedUser = await resolver.removeUser(userId.toString());
    expect(removedUser).toBeDefined();
  });
});
