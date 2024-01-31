import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginUserInput } from './dto/login-user.input';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginUserInput: LoginUserInput) {
    const user = await this.userService.findByEmail(loginUserInput.email);
    const expiresIn = this.configService.get('ACCESS_TOKEN_EXPIRATION');

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn,
    });

    return {
      accessToken,
    };
  }

  async validateUser(loginUserInput: LoginUserInput) {
    const user = await this.userService.findByEmail(loginUserInput.email);

    if (!user) return null;

    const isCorrectPassword = await compare(
      loginUserInput.password,
      user.password,
    );

    if (!isCorrectPassword) return null;

    delete user.password;
    return user;
  }
}
