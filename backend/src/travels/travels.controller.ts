import {
  Controller,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Public } from 'src/auth/decorators/public.decorator';
import { getExternalFileUrl } from 'src/utils/file';

@Controller('travels')
@Public()
export class TravelsController {
  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('images', 4, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFiles() files: Express.Multer.File[],
    @Req() request,
  ) {
    return files.map((file) => ({
      filename: file.filename,
      url: getExternalFileUrl(request, file.filename),
      originalname: file.originalname,
    }));
  }
}
