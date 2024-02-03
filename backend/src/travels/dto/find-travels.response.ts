import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Travel } from '../entities/travel.entity';

@ObjectType()
export class FindAllResponse {
  @Field(() => [Travel], { nullable: false })
  items: Travel[];

  @Field(() => Int)
  count: number;
}
