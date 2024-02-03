import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { PUBLIC_METADATA_KEY } from '../decorators/public.decorator';

@Injectable()
export class JWTAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  handleRequest(err, user, info, context) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      PUBLIC_METADATA_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (user) return user;

    if (isPublic) {
      return true;
    }

    return super.handleRequest(err, user, info, context);
  }
}
