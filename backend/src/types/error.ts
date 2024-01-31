import { Field, ObjectType } from '@nestjs/graphql';

interface BasicError {
  message: string;
  code: string;
}

@ObjectType()
export class GqlFailedResponse {
  @Field(() => [String])
  errors: BasicError[];
}
