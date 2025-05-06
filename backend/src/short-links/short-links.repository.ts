/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ShortLinks } from './short-links.entity';
import { IShortLink } from './short-links.interface';
import { PaginationService } from '../pagination/pagination.service';
import { IPagination } from '../pagination/pagination.interface';

@Injectable()
export class ShortLinksRepository {
  constructor(
    @InjectRepository(ShortLinks)
    private readonly shortLinksRepository: Repository<ShortLinks>,
    @Inject(ShortLinks)
    private readonly paginationService: PaginationService<ShortLinks>,
  ) {}

  async create(shortLink: IShortLink): Promise<ShortLinks> {
    try {
      return await this.shortLinksRepository.save(shortLink);
    } catch (error) {
      throw new InternalServerErrorException('Create short link error', error);
    }
  }

  async findAll(shortLink: IShortLink): Promise<ShortLinks[]> {
    try {
      return await this.shortLinksRepository.find({ where: shortLink });
    } catch (error) {
      throw new InternalServerErrorException('Find short links error', error);
    }
  }

  async findAllAndPaginate(
    shortLink: IShortLink,
    params: any,
  ): Promise<IPagination<ShortLinks>> {
    try {
      if (params.q) {
        return await this.paginationService.paginate({
          where: {
            fullLink: Like(`%${params.q}%`),
          },
        });
      } else {
        return await this.paginationService.paginate({
          where: { ...shortLink },
          ...params,
        });
      }
    } catch (error) {
      throw new InternalServerErrorException(
        'Find short links paginate error',
        error,
      );
    }
  }

  async findOne(shortLink: IShortLink): Promise<ShortLinks | null> {
    try {
      return await this.shortLinksRepository.findOneBy(shortLink);
    } catch (error) {
      throw new InternalServerErrorException(
        'Find one short link error',
        error,
      );
    }
  }

  async remove(shortLink: IShortLink): Promise<void> {
    try {
      await this.shortLinksRepository.delete(shortLink.id as string);
    } catch (error) {
      throw new InternalServerErrorException('Remove short link error', error);
    }
  }

  async update(shortLink: IShortLink): Promise<void> {
    try {
      await this.shortLinksRepository.update({ id: shortLink.id }, shortLink);
    } catch (error) {
      throw new InternalServerErrorException('Update short link error', error);
    }
  }
}
