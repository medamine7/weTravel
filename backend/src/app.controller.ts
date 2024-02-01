import { Controller, Get, Param, Res } from '@nestjs/common';
import { Public } from './auth/decorators/public.decorator';

@Controller()
export class AppController {
  @Public()
  @Get('health')
  healthCheck(): string {
    return 'OK';
  }

  @Public()
  @Get('/file/:filename')
  seeUploadedFile(@Param('filename') image: string, @Res() res: any) {
    return res.sendFile(image, { root: './uploads' });
  }
}
