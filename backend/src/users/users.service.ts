import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Role } from 'src/constants/roles.enum';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const hashedPassword = await this.encryptPassword(createUserInput.password);
    const role = createUserInput.role || Role.USER;

    const createdUser = new this.userModel({
      ...createUserInput,
      role,
      password: hashedPassword,
    });

    return createdUser.save();
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUserInput).exec();
  }

  remove(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async seed() {
    const users = [
      {
        name: 'John mcAdmin Doe',
        email: 'admin@example.com',
        password: 'secret123',
        role: Role.ADMIN,
      },
      {
        name: 'Jane mcUser Doe',
        email: 'user@example.com',
        password: 'secret123',
        role: Role.USER,
      },
    ];

    for (const user of users) {
      user.password = await this.encryptPassword(user.password);
    }

    this.userModel.insertMany(users);
  }

  private async encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
}
