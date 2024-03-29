import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type TourDocument = HydratedDocument<Tour>;

@Schema()
@ObjectType()
export class Tour {
  @Field(() => ID)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  title: string;

  @Field(() => Date)
  @Prop()
  from: Date;

  @Field(() => Date)
  @Prop()
  to: Date;

  @Field(() => Int)
  @Prop()
  price: number;

  @Field(() => Date)
  @Prop({ default: Date.now })
  createdAt: Date;

  @Field(() => ID)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Travel' })
  travelId: MongooseSchema.Types.ObjectId;

  // for easier access to the id (virtual property)
  @Field(() => String)
  id: string;
}

export const TourSchema = SchemaFactory.createForClass(Tour);
