import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Tour } from 'src/tours/entities/tour.entity';

@ObjectType()
export class ImageFile {
  @Field()
  url: string;

  @Field()
  filename: string;

  @Field()
  originalname: string;
}

export type TravelDocument = HydratedDocument<Travel>;

@Schema()
@ObjectType()
export class Travel {
  @Field(() => ID)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  title: string;

  @Field(() => String)
  @Prop()
  description: string;

  @Field(() => Int)
  @Prop()
  duration: number;

  @Field(() => [ImageFile])
  @Prop({ type: [ImageFile] })
  images: ImageFile[];

  @Field(() => String)
  @Prop({ unique: true })
  slug: string;

  @Field(() => Boolean, { defaultValue: false })
  @Prop({ default: false })
  public?: boolean;

  @Field(() => [Tour], { nullable: false })
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Tour' }] })
  tours?: Tour[] | MongooseSchema.Types.ObjectId[];

  @Field(() => Date)
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  // for easier access to the id (virtual property)
  @Field(() => String)
  id: string;
}

export const TravelSchema = SchemaFactory.createForClass(Travel);
