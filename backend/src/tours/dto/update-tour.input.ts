import { CreateTourInput } from './create-tour.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTourInput extends PartialType(CreateTourInput) {
  @Field(() => String, { description: 'Tour ID' })
  id: string;
}
