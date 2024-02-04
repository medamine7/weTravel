import { Test, TestingModule } from '@nestjs/testing';
import { TravelsResolver } from './travels.resolver';
import { TravelsService } from './travels.service';
import { CreateTravelInput } from './dto/create-travel.input';
import * as mongoose from 'mongoose';
import { UpdateTravelInput } from './dto/update-travel.input';
import { faker } from '@faker-js/faker';

const createTravelInput: CreateTravelInput = {
  title: faker.lorem.sentence(),
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

const travelId = new mongoose.Types.ObjectId();
const updateTravelInput: UpdateTravelInput = {
  id: travelId.toString(),
  title: faker.lorem.sentence(),
};

describe('TravelsResolver', () => {
  let resolver: TravelsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TravelsResolver,
        {
          provide: TravelsService,
          useValue: {
            create: jest.fn(() => {
              return {
                _id: travelId,
                ...createTravelInput,
              };
            }),
            findAll: jest.fn(() => {
              return [
                {
                  _id: travelId,
                  ...createTravelInput,
                },
              ];
            }),
            getTravels: jest.fn(() => {
              return {
                travels: [
                  {
                    _id: travelId,
                    ...createTravelInput,
                  },
                ],
                count: 1,
              };
            }),
            findOne: jest.fn(() => {
              return {
                _id: travelId,
                ...createTravelInput,
              };
            }),
            update: jest.fn(() => {
              return {
                _id: travelId,
                ...createTravelInput,
                ...updateTravelInput,
              };
            }),
            remove: jest.fn(() => {
              return {};
            }),
          },
        },
      ],
    }).compile();

    resolver = module.get<TravelsResolver>(TravelsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should be able to create an travel', async () => {
    const travel = await resolver.createTravel(createTravelInput);
    expect(travel._id).toBeDefined();
    expect(travel._id).toBe(travelId);
    expect(travel.title).toBe(createTravelInput.title);
    expect(travel.description).toBe(createTravelInput.description);
    expect(travel.duration).toBe(createTravelInput.duration);
    expect(travel.images).toStrictEqual(createTravelInput.images);
  });
  it('should be able to find one travel by id', async () => {
    const travel = await resolver.findOne(travelId.toString());
    expect(travel).toBeDefined();
    expect(travel._id).toBe(travelId);
  });
  it('should be able to test updateTravel ', async () => {
    const updatedTravel = await resolver.updateTravel(updateTravelInput);
    expect(updatedTravel).toBeDefined();
    expect(updatedTravel.title).toBe(updateTravelInput.title);
  });
  it('should be able to test removeTravel ', async () => {
    const removedTravel = await resolver.removeTravel(travelId.toString());
    expect(removedTravel).toBeDefined();
  });
});
