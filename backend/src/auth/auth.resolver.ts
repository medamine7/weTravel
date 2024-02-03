import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginUserResponse } from './dto/login-user.response';
import { LoginUserInput } from './dto/login-user.input';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from './decorators/public.decorator';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Mutation(() => LoginUserResponse)
  login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.authService.login(loginUserInput);
  }

  @Mutation(() => String)
  async logout(@CurrentUser() user: User) {
    await this.authService.logout(user.id);

    return 'Logged out successfully';
  }

  @Public()
  @Mutation(() => LoginUserResponse)
  async refresh(@Args('refreshToken') refreshToken: string) {
    const newToken = await this.authService.refresh(refreshToken);

    if (!newToken) {
      throw new Error('Invalid refresh token');
    }

    return {
      accessToken: newToken,
      refreshToken,
    };
  }
}
