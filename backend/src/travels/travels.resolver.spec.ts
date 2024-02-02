import { Test, TestingModule } from '@nestjs/testing';
import { TravelsResolver } from './travels.resolver';
import { TravelsService } from './travels.service';
import { CreateTravelInput } from './dto/create-travel.input';
import { Travel } from './entities/travel.entity';
import { User } from 'src/users/entities/user.entity';
describe('TravelsResolver', () => {
  let resolver: TravelsResolver;
  let travelsService: TravelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TravelsResolver, TravelsService],
    }).compile();

    resolver = module.get<TravelsResolver>(TravelsResolver);
    travelsService = module.get<TravelsService>(TravelsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createTravel', () => {
    it('should create a new travel', async () => {
      const createTravelInput: CreateTravelInput = {
        // Provide the necessary input values for creating a travel
      };

      const createdTravel: Travel = {
        // Provide the expected created travel object
      };

      jest
        .spyOn(travelsService, 'createTravel')
        .mockResolvedValue(createdTravel);

      const result = await resolver.createTravel(createTravelInput);

      expect(result).toEqual(createdTravel);
      expect(travelsService.createTravel).toHaveBeenCalledWith(
        createTravelInput,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of travels', async () => {
      const user: User = {
        // Provide the necessary user object
      };

      const limit = 10;

      const travels: Travel[] = [
        // Provide the expected array of travels
      ];

      jest.spyOn(travelsService, 'findAll').mockResolvedValue(travels);

      const result = await resolver.findAll(user, limit);

      expect(result).toEqual(travels);
      expect(travelsService.findAll).toHaveBeenCalledWith(user, limit);
    });
  });

  // Add more test cases for other resolver methods
});
