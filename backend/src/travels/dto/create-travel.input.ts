import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTravelInput {
  @Field(() => String, { description: 'Travel title' })
  title: string;

  @Field(() => String, { description: 'Travel description' })
  description: string;

  @Field(() => Int, { description: 'Travel duration' })
  duration: number;

  @Field(() => [String], { description: 'Travel images' })
  images: string[];

  @Field(() => Boolean, { description: 'Travel public' })
  public?: boolean;
}
