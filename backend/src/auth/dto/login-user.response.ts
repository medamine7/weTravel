import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class LoginUserResponse {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
