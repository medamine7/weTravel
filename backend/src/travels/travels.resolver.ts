import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { TravelsService } from './travels.service';
import { Travel } from './entities/travel.entity';
import { CreateTravelInput } from './dto/create-travel.input';
import { UpdateTravelInput } from './dto/update-travel.input';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/constants/roles.enum';
import { Public } from 'src/auth/decorators/public.decorator';
import { User } from 'src/users/entities/user.entity';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { FindAllResponse } from './dto/find-travels.response';

@Resolver(() => Travel)
@Roles(Role.ADMIN)
export class TravelsResolver {
  constructor(private readonly travelsService: TravelsService) {}

  @Mutation(() => Travel)
  createTravel(
    @Args('createTravelInput') createTravelInput: CreateTravelInput,
  ) {
    return this.travelsService.create(createTravelInput);
  }

  @Public()
  @Query(() => FindAllResponse, { name: 'travels' })
  findAll(
    @CurrentUser() user: User,
    @Args('limit', { type: () => Int, nullable: true }) limit: number,
    @Args('skip', { type: () => Int, nullable: true }) skip: number,
  ) {
    const hasAccess = user?.role === Role.ADMIN;

    return this.travelsService.findAll({
      publicOnly: !hasAccess,
      limit,
      skip,
    });
  }

  @Query(() => Travel, { name: 'travel' })
  findOne(
    @CurrentUser() user: User,
    @Args('id', { type: () => String }) id: string,
  ) {
    const hasAccess = user?.role === Role.ADMIN;

    return this.travelsService.findOne(id, {
      publicOnly: !hasAccess,
    });
  }

  @Public()
  @Query(() => Travel, { nullable: true })
  async travelBySlug(
    @CurrentUser() user: User,
    @Args('slug', { type: () => String }) slug: string,
  ): Promise<Travel | null> {
    const hasAccess = user?.role === Role.ADMIN;

    return this.travelsService.findBySlug(slug, {
      publicOnly: !hasAccess,
    });
  }

  @Mutation(() => Travel)
  updateTravel(
    @Args('updateTravelInput') updateTravelInput: UpdateTravelInput,
  ) {
    return this.travelsService.update(updateTravelInput.id, updateTravelInput);
  }

  @Mutation(() => Travel)
  removeTravel(@Args('id', { type: () => ID }) id: string) {
    return this.travelsService.remove(id);
  }
}
