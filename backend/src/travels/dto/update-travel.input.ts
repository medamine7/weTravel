import { CreateTravelInput } from './create-travel.input';
import { InputType, Field, ID, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTravelInput extends PartialType(CreateTravelInput) {
  @Field(() => ID)
  id: string;
}
