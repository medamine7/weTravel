import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TravelsService } from './travels.service';
import { Travel } from './entities/travel.entity';
import { CreateTravelInput } from './dto/create-travel.input';
import { UpdateTravelInput } from './dto/update-travel.input';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/constants/roles.enum';
import { Public } from 'src/auth/decorators/public.decorator';

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

  @Query(() => [Travel], { name: 'travels' })
  findAll() {
    return this.travelsService.findAll();
  }

  @Public()
  @Query(() => [Travel], { name: 'publicTravels' })
  findPublic(
    @Args('limit', { type: () => Int, nullable: true }) limit: number,
  ) {
    return this.travelsService.findPublic({
      limit,
    });
  }

  @Query(() => Travel, { name: 'travel' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.travelsService.findOne(id);
  }

  @Public()
  @Query(() => Travel, { nullable: true })
  async travelBySlug(
    @Args('slug', { type: () => String }) slug: string,
  ): Promise<Travel | null> {
    return this.travelsService.findBySlug(slug);
  }

  @Mutation(() => Travel)
  updateTravel(
    @Args('updateTravelInput') updateTravelInput: UpdateTravelInput,
  ) {
    return this.travelsService.update(updateTravelInput.id, updateTravelInput);
  }

  @Mutation(() => Travel)
  removeTravel(@Args('id', { type: () => Int }) id: string) {
    return this.travelsService.remove(id);
  }
}
