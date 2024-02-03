import { Module } from '@nestjs/common';
import { ToursService } from './tours.service';
import { ToursResolver } from './tours.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Tour, TourSchema } from './entities/tour.entity';
import { TravelsModule } from 'src/travels/travels.module';

@Module({
  providers: [ToursResolver, ToursService],
  imports: [
    MongooseModule.forFeature([{ name: Tour.name, schema: TourSchema }]),
    TravelsModule,
  ],
  exports: [ToursService],
})
export class ToursModule {}
