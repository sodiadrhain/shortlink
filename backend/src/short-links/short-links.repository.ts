import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShortLinks } from './short-links.entity';
import { IShortLink } from './short-links.interface';

@Injectable()
export class ShortLinksRepository {
  constructor(
    @InjectRepository(ShortLinks)
    private readonly usersRepository: Repository<ShortLinks>,
  ) {}

  async create(shortLink: IShortLink): Promise<ShortLinks> {
    try {
      return await this.usersRepository.save(shortLink);
    } catch (error) {
      throw new InternalServerErrorException('Create short link error', error);
    }
  }

  async findAll(shortLink: IShortLink): Promise<ShortLinks[]> {
    try {
      return await this.usersRepository.find({ where: shortLink });
    } catch (error) {
      throw new InternalServerErrorException('Find short links error', error);
    }
  }

  async findOne(shortLink: IShortLink): Promise<ShortLinks | null> {
    try {
      return await this.usersRepository.findOneBy(shortLink);
    } catch (error) {
      throw new InternalServerErrorException(
        'Find one short link error',
        error,
      );
    }
  }

  async remove(shortLink: IShortLink): Promise<void> {
    try {
      await this.usersRepository.delete(shortLink.id as string);
    } catch (error) {
      throw new InternalServerErrorException('Remove short link error', error);
    }
  }

  async update(shortLink: IShortLink): Promise<void> {
    try {
      await this.usersRepository.update({ id: shortLink.id }, shortLink);
    } catch (error) {
      throw new InternalServerErrorException('Update short link error', error);
    }
  }
}
