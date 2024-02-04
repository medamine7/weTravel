import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { User, UserSchema } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from 'src/mongoose.herlper';
import { faker } from '@faker-js/faker';
import { Role } from 'src/constants/roles.enum';

const createUserInput: CreateUserInput = {
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  role: Role.USER,
};

let userId = '';

const updateUserInput: UpdateUserInput = {
  id: userId.toString(),
  name: faker.person.fullName(),
};

describe('UsersService', () => {
  let service: UsersService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          {
            name: User.name,
            schema: UserSchema,
          },
        ]),
      ],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterAll(async () => {
    if (module) {
      await module.close();
      await closeInMongodConnection();
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an user with createUserInput', async () => {
    const user = await service.create(createUserInput);
    expect(user.id).toBeDefined();
    expect(user.name).toBe(createUserInput.name);
    expect(user.email).toBe(createUserInput.email);
    expect(user.role).toBe(createUserInput.role);
    userId = user.id;
  });

  it('should get the user by its own userId', async () => {
    const user = await service.findOne(userId);
    expect(user.id).toBe(userId);
    expect(user.name).toBe(createUserInput.name);
    expect(user.email).toBe(createUserInput.email);
    expect(user.role).toBe(createUserInput.role);
  });

  // it('should update some user properties', async () => {
  //   updateUserInput.id = userId;
  //   const updatedUser = await service.update(
  //     updateUserInput.id,
  //     updateUserInput,
  //   );
  //   expect(updatedUser.id).toBe(userId);
  //   expect(updatedUser.name).toBe(updateUserInput.name);
  //   expect(updatedUser.name).not.toBe(createUserInput.name);
  // });

  it('should delete the testing user', async () => {
    const deletedUser = await service.remove(userId);
    expect(deletedUser).toBeDefined();
  });

  it('should receive not found error for getting the deleted user', async () => {
    try {
      await service.findOne(userId);
    } catch (err) {
      expect(err).toBeDefined();
      expect(err.response).toBeDefined();
      expect(err.response.statusCode).toBe(404);
    }
  });

  it('should not be able to update an non existing user', async () => {
    try {
      await service.update(userId, updateUserInput);
    } catch (err) {
      expect(err).toBeDefined();
      expect(err.response).toBeDefined();
      expect(err.response.statusCode).toBe(404);
    }
  });
});
