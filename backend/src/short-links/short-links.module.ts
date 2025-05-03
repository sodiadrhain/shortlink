import { Module } from '@nestjs/common';
import { ShortLinksController } from './short-links.controller';
import { ShortLinksService } from './short-links.service';
import { ShortLinks } from './short-links.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortLinksRepository } from './short-links.repository';

@Module({
  controllers: [ShortLinksController],
  providers: [ShortLinksService, ShortLinksRepository],
  imports: [TypeOrmModule.forFeature([ShortLinks])],
})
export class ShortLinksModule {}
