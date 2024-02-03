import { Injectable } from '@nestjs/common';
import { CreateTourInput } from './dto/create-tour.input';
import { UpdateTourInput } from './dto/update-tour.input';
import { Tour } from './entities/tour.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TravelsService } from 'src/travels/travels.service';
import { faker } from '@faker-js/faker';

@Injectable()
export class ToursService {
  constructor(
    @InjectModel(Tour.name) private tourModel: Model<Tour>,
    private travelService: TravelsService,
  ) {}

  async create(createTourInput: CreateTourInput): Promise<Tour> {
    const createdTour = new this.tourModel(createTourInput);
    const savedTour = await createdTour.save();

    await this.travelService.addTour(
      createTourInput.travelId.toString(),
      savedTour._id.toString(),
    );

    return savedTour;
  }

  findAll(): Promise<Tour[]> {
    return this.tourModel.find().exec();
  }

  findOne(id: string): Promise<Tour> {
    return this.tourModel.findById(id).exec();
  }

  update(id: string, updateTourInput: UpdateTourInput): Promise<Tour> {
    return this.tourModel.findByIdAndUpdate(id, updateTourInput).exec();
  }

  remove(id: string): Promise<Tour> {
    return this.tourModel.findByIdAndDelete(id).exec();
  }

  async seed() {
    const travels = await this.travelService.findAll();

    if (!travels?.items?.length) {
      return;
    }

    for (let i = 0; i < travels.count; i++) {
      const travel = travels.items[i];
      const tours = [
        {
          title: travel.title + ' - Tour 1',
          price: faker.number.int({ min: 100, max: 300 }),
          travelId: travel._id,
          from: faker.date.soon({ days: 2 }),
          to: faker.date.soon({ days: 5 }),
        },
        {
          title: travel.title + ' - Tour 2',
          price: faker.number.int({ min: 100, max: 300 }),
          travelId: travel._id,
          from: faker.date.soon({ days: 7 }),
          to: faker.date.soon({ days: 10 }),
        },
        {
          title: travel.title + ' - Tour 3',
          price: faker.number.int({ min: 100, max: 300 }),
          travelId: travel._id,
          from: faker.date.soon({ days: 20 }),
          to: faker.date.soon({ days: 25 }),
        },
      ];

      const items = await this.tourModel.insertMany(tours);

      for (const item of items) {
        await this.travelService.addTour(travel.id, item.id);
      }
    }
  }
}
