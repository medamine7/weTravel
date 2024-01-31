import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateTourInput {
  @Field(() => String, { description: 'Tour title' })
  title: string;

  @Field(() => Int, { description: 'Tour price' })
  price: number;

  @Field(() => String, { description: 'Tour start date' })
  from: string;

  @Field(() => String, { description: 'Tour end date' })
  to: string;

  @Field(() => ID, { description: 'Travel ID' })
  travelId: string;
}
