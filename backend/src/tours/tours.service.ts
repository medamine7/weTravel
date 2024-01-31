import { Injectable } from '@nestjs/common';
import { CreateTourInput } from './dto/create-tour.input';
import { UpdateTourInput } from './dto/update-tour.input';
import { Tour } from './entities/tour.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TravelsService } from 'src/travels/travels.service';

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
}
