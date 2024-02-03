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

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = await this.generateAccessToken(payload);
    const refreshToken = await this.generateRefreshToken(payload);

    this.userService.setRefreshToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refresh(refreshToken: string) {
    const user = await this.userService.findByRefreshToken(refreshToken);

    if (!user) return null;

    const payload = this.jwtService.verify(refreshToken);
    delete payload.exp;
    delete payload.iat;
    const token = await this.generateAccessToken(payload);

    await this.userService.setRefreshToken(payload.sub, refreshToken);

    return token;
  }

  async logout(userId: string) {
    return this.userService.revokeRefreshToken(userId);
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

  private async generateAccessToken(payload: any) {
    const expiresIn = this.configService.get('ACCESS_TOKEN_EXPIRATION');

    return this.jwtService.signAsync(payload, {
      expiresIn,
    });
  }

  private async generateRefreshToken(payload: any) {
    const expiresIn = this.configService.get('REFRESH_TOKEN_EXPIRATION');
    return this.jwtService.signAsync(payload, {
      expiresIn,
    });
  }
}
