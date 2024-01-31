import { Module } from '@nestjs/common';
import { TravelsService } from './travels.service';
import { TravelsResolver } from './travels.resolver';
import { Travel, TravelSchema } from './entities/travel.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [TravelsResolver, TravelsService],
  imports: [
    MongooseModule.forFeature([{ name: Travel.name, schema: TravelSchema }]),
  ],
  exports: [TravelsService],
})
export class TravelsModule {}
