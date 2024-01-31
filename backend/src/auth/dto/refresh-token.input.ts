import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RefreshTokenInput {
  @Field()
  email: string;

  @Field()
  sub: string;
}
