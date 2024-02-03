import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { Public } from './auth/decorators/public.decorator';
import { UsersService } from './users/users.service';
import { TravelsService } from './travels/travels.service';
import { ToursService } from './tours/tours.service';

@Controller()
export class AppController {
  constructor(
    private usersService: UsersService,
    private travelsService: TravelsService,
    private toursService: ToursService,
  ) {}

  @Public()
  @Get('health')
  healthCheck(@Res() res): string {
    return res.send({
      message: 'Server is up and running',
    });
  }

  @Public()
  @Get('/file/:filename')
  seeUploadedFile(@Param('filename') image: string, @Res() res: any) {
    return res.sendFile(image, { root: './uploads' });
  }

  @Public()
  @Get('/seed')
  async seed(@Req() request, @Res() res) {
    await this.usersService.seed();
    await this.travelsService.seed({
      request,
    });

    await this.toursService.seed();

    return res.send({
      message: 'Seed completed',
    });
  }
}
