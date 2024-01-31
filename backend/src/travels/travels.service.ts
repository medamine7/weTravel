import { Injectable } from '@nestjs/common';
import { CreateTravelInput } from './dto/create-travel.input';
import { UpdateTravelInput } from './dto/update-travel.input';
import { Travel } from './entities/travel.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import slugify from 'slugify';

@Injectable()
export class TravelsService {
  constructor(@InjectModel(Travel.name) private travelModel: Model<Travel>) {}

  create(createTravelInput: CreateTravelInput): Promise<Travel> {
    const createdTravel = new this.travelModel(createTravelInput);
    createdTravel.slug = slugify(createTravelInput.title, {
      lower: true,
    });

    return createdTravel.save();
  }

  findAll(): Promise<Travel[]> {
    return this.travelModel.find().exec();
  }

  findOne(id: string): Promise<Travel> {
    return this.travelModel.findById(id).exec();
  }

  async findBySlug(slug: string): Promise<Travel | null> {
    return this.travelModel.findOne({ slug }).exec();
  }

  update(id: string, updateTravelInput: UpdateTravelInput): Promise<Travel> {
    return this.travelModel.findByIdAndUpdate(id, updateTravelInput).exec();
  }

  remove(id: string): Promise<Travel> {
    return this.travelModel.findByIdAndDelete(id).exec();
  }

  findPublic({ limit }: { limit?: number }): Promise<Travel[]> {
    let query = this.travelModel.find({ public: true });

    if (limit != null) {
      query = query.limit(limit);
    }

    return query.exec();
  }

  addTour(travelId: string, tourId: string): Promise<Travel> {
    return this.travelModel
      .findByIdAndUpdate(
        travelId,
        {
          $push: {
            tours: tourId,
          },
        },
        { new: true },
      )
      .exec();
  }
}
