import { Test, TestingModule } from '@nestjs/testing';
import { TravelsService } from './travels.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateTravelInput } from './dto/create-travel.input';
import { Travel, TravelSchema } from './entities/travel.entity';
import { UpdateTravelInput } from './dto/update-travel.input';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from 'src/mongoose.herlper';
import { faker } from '@faker-js/faker';
import { Tour, TourSchema } from 'src/tours/entities/tour.entity';

const createTravelInput: CreateTravelInput = {
  title: 'Travel Title',
  description: faker.lorem.paragraph(),
  duration: faker.number.int(),
  images: [
    {
      url: faker.image.url(),
      filename: faker.system.fileName(),
      originalname: faker.system.fileName(),
    },
  ],
};

let travelId = '';

const updateTravelInput: UpdateTravelInput = {
  id: travelId.toString(),
  title: 'Updated Travel Title',
};

describe('TravelsService', () => {
  let service: TravelsService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          {
            name: Travel.name,
            schema: TravelSchema,
          },
          {
            name: Tour.name,
            schema: TourSchema,
          },
        ]),
      ],
      providers: [TravelsService],
    }).compile();

    service = module.get<TravelsService>(TravelsService);
  });

  afterAll(async () => {
    if (module) {
      await module.close();
      await closeInMongodConnection();
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an travel with createTravelInput', async () => {
    const travel = await service.create(createTravelInput);
    expect(travel.id).toBeDefined();
    expect(travel.title).toBe(createTravelInput.title);
    expect(travel.description).toBe(createTravelInput.description);
    expect(travel.duration).toBe(createTravelInput.duration);
    travelId = travel.id;
  });

  it('should get the travel by its own travelId', async () => {
    const travel = await service.findOne(travelId);
    expect(travel.id).toBe(travelId);
    expect(travel.title).toBe(createTravelInput.title);
    expect(travel.description).toBe(createTravelInput.description);
    expect(travel.duration).toBe(createTravelInput.duration);
  });

  it('should get a list of travels', async () => {
    const paginationQuery = { skip: 0, limit: 10 };
    const { items: travels, count } = await service.findAll(paginationQuery);
    expect(travels).toBeDefined();
    expect(count).toBeDefined();
    expect(count).toBe(1);
    expect(Array.isArray(travels)).toBe(true);
    expect(travels.length).toBe(1);
    expect(travels[0].title).toBe(createTravelInput.title);
    expect(travels[0].description).toBe(createTravelInput.description);
    expect(travels[0].duration).toBe(createTravelInput.duration);
  });

  it('should delete the testing travel', async () => {
    const deletedTravel = await service.remove(travelId);
    expect(deletedTravel).toBeDefined();
  });

  it('should receive not found error for getting the deleted travel', async () => {
    try {
      await service.findOne(travelId);
    } catch (err) {
      expect(err).toBeDefined();
      expect(err.response).toBeDefined();
      expect(err.response.statusCode).toBe(404);
    }
  });

  it('should not be able to update an non existing travel', async () => {
    try {
      await service.update(travelId, updateTravelInput);
    } catch (err) {
      expect(err).toBeDefined();
      expect(err.response).toBeDefined();
      expect(err.response.statusCode).toBe(404);
    }
  });
});
