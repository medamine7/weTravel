import { Injectable } from '@nestjs/common';
import { CreateTravelInput } from './dto/create-travel.input';
import { UpdateTravelInput } from './dto/update-travel.input';
import { Travel } from './entities/travel.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import slugify from 'slugify';
import { faker } from '@faker-js/faker';

import {
  FindAllOptions,
  FindAllResponse,
  FindOneOptions,
} from './interfaces/travels-service.interface';
import { getExternalFileUrl } from 'src/utils/file';

@Injectable()
export class TravelsService {
  constructor(@InjectModel(Travel.name) private travelModel: Model<Travel>) {}

  create(createTravelInput: CreateTravelInput): Promise<Travel> {
    const createdTravel = new this.travelModel(createTravelInput);

    createdTravel.slug = this.slugify(createdTravel.title);

    return createdTravel.save();
  }

  async findAll(options?: FindAllOptions): Promise<FindAllResponse> {
    const { publicOnly, limit, skip } = options || {};

    let query = this.travelModel.find().sort({ createdAt: -1 });

    if (publicOnly) {
      query = query.where({ public: true });
    }

    if (limit != null) {
      query = query.limit(limit);
    }

    if (skip != null) {
      query = query.skip(skip);
    }

    const items = await query.exec();
    const count = await this.getCount(publicOnly ? { public: true } : {});

    return {
      items,
      count,
    };
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

  private getCount(filter: any) {
    return this.travelModel.countDocuments(filter).exec();
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

  seed({ request }) {
    const travels = Array.from({ length: 30 }, (_, index) => {
      const title = faker.location.country();
      const description = faker.commerce.productDescription();
      const isPublic = faker.datatype.boolean();
      const duration = faker.number.int({ min: 1, max: 30 });
      const slug = this.slugify(`${title}-${index}`);
      const images = Array.from({ length: 4 }, () => {
        const num = faker.number.int({ min: 1, max: 10 });
        const file = num + '.jpg';

        return {
          url: getExternalFileUrl(request, file),
          filename: file,
          originalname: file,
        };
      });

      return {
        title,
        description,
        public: isPublic,
        duration,
        slug,
        tours: [],
        images,
      };
    });

    return this.travelModel.insertMany(travels);
  }

  private slugify(string: string) {
    const timestamp = Date.now();
    const toSlugify = `${string}-${timestamp}`;
    return slugify(toSlugify, {
      lower: true,
      strict: true,
    });
  }
}
