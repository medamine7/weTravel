import { InputType, Field } from '@nestjs/graphql';
import { Role } from 'src/constants/roles.enum';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Name of the user' })
  name: string;

  @Field(() => String, { description: 'Email of the user' })
  email: string;

  @Field(() => String, { description: 'Password of the user' })
  password: string;

  @Field(() => String, { description: 'Role of the user', nullable: true })
  role?: Role;
}
