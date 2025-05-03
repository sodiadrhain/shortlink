import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { IUser } from './users.interface';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async create(user: IUser): Promise<Users> {
    try {
      user.apiKey = randomUUID();
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException('Create user error', error);
    }
  }

  async findAll(): Promise<Users[]> {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Find users error', error);
    }
  }

  async findOne(user: IUser): Promise<Users | null> {
    try {
      return await this.usersRepository.findOneBy(user);
    } catch (error) {
      throw new InternalServerErrorException('Find one user error', error);
    }
  }

  async remove(user: IUser): Promise<void> {
    try {
      await this.usersRepository.delete(user.id as string);
    } catch (error) {
      throw new InternalServerErrorException('Remove user error', error);
    }
  }

  async update(user: IUser): Promise<void> {
    try {
      await this.usersRepository.update({ id: user.id }, user);
    } catch (error) {
      throw new InternalServerErrorException('Update user error', error);
    }
  }
}
