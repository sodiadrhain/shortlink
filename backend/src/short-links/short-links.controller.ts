import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { DecodeLinkDto, EncodeLinkDto } from './short-links.dto';
import { ShortLinksService } from './short-links.service';

@Controller()
export class ShortLinksController {
  constructor(private readonly shortLinksService: ShortLinksService) {}

  @Post('/encode')
  @HttpCode(HttpStatus.OK)
  encode(@Req() req: Request, @Body() encodeLinkDto: EncodeLinkDto) {
    return this.shortLinksService.encodeLink(req['userId'], encodeLinkDto);
  }

  @Post('/decode')
  @HttpCode(HttpStatus.OK)
  decode(@Req() req: Request, @Body() decodeLinkDto: DecodeLinkDto) {
    return this.shortLinksService.decodeLink(req['userId'], decodeLinkDto);
  }

  @Get('/statistic/:urlPath')
  @HttpCode(HttpStatus.OK)
  statistic(@Req() req: Request, @Param('urlPath') urlPath: string) {
    return this.shortLinksService.getLinkStats(req['userId'], urlPath);
  }

  @Get('/list')
  @HttpCode(HttpStatus.OK)
  list(@Req() req: Request) {
    return this.shortLinksService.getLinks(req['userId']);
  }

  @Get('/search')
  @HttpCode(HttpStatus.OK)
  search(@Req() req: Request, @Query('q') query: string) {
    return this.shortLinksService.search(req['userId'], query);
  }
}
