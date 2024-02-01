import { Injectable } from '@nestjs/common';
import { CreateTravelInput } from './dto/create-travel.input';
import { UpdateTravelInput } from './dto/update-travel.input';
import { Travel } from './entities/travel.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import slugify from 'slugify';
import {
  FindAllOptions,
  FindOneOptions,
} from './interfaces/travels-service.interface';

@Injectable()
export class TravelsService {
  constructor(@InjectModel(Travel.name) private travelModel: Model<Travel>) {}

  create(createTravelInput: CreateTravelInput): Promise<Travel> {
    const createdTravel = new this.travelModel(createTravelInput);
    const timestamp = Date.now();
    const toSlugify = `${createTravelInput.title}-${timestamp}`;

    createdTravel.slug = slugify(toSlugify, {
      lower: true,
      strict: true,
    });

    return createdTravel.save();
  }

  findAll(options?: FindAllOptions): Promise<Travel[]> {
    const { publicOnly, limit } = options || {};

    let query = this.travelModel.find();

    if (publicOnly) {
      query = query.where({ public: true });
    }

    if (limit != null) {
      query = query.limit(limit);
    }

    return query.exec();
  }

  findOne(id: string, options?: FindOneOptions): Promise<Travel> {
    const { publicOnly } = options || {};

    let query = this.travelModel.findById(id);

    if (publicOnly) {
      query = query.where({ public: true });
    }

    return query.exec();
  }

  async findBySlug(
    slug: string,
    options?: FindOneOptions,
  ): Promise<Travel | null> {
    const { publicOnly } = options || {};

    let query = this.travelModel.findOne({ slug });

    if (publicOnly) {
      query = query.where({ public: true });
    }

    return query.exec();
  }

  update(id: string, updateTravelInput: UpdateTravelInput): Promise<Travel> {
    return this.travelModel.findByIdAndUpdate(id, updateTravelInput).exec();
  }

  remove(id: string): Promise<Travel> {
    return this.travelModel.findByIdAndDelete(id).exec();
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
