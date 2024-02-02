import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class UploadedImage {
  @Field()
  url: string;

  @Field()
  filename: string;

  @Field()
  originalname: string;
}

@InputType()
export class CreateTravelInput {
  @Field(() => String, { description: 'Travel title' })
  title: string;

  @Field(() => String, { description: 'Travel description' })
  description: string;

  @Field(() => Int, { description: 'Travel duration' })
  duration: number;

  @Field(() => [UploadedImage], { description: 'Travel UploadedImages' })
  images: UploadedImage[];

  @Field(() => Boolean, { description: 'Travel public' })
  public?: boolean;
}
