import { Module } from '@nestjs/common';
import { ShortLinksController } from './short-links.controller';
import { ShortLinksService } from './short-links.service';
import { ShortLinks } from './short-links.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortLinksRepository } from './short-links.repository';
import { PaginationModule } from 'src/pagination/pagination.module';

@Module({
  controllers: [ShortLinksController],
  providers: [ShortLinksService, ShortLinksRepository],
  imports: [
    TypeOrmModule.forFeature([ShortLinks]),
    PaginationModule.forModels([ShortLinks]),
  ],
})
export class ShortLinksModule {}
