import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { IUser } from './users.interface';

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UserRepository) {}
  getUser(user: IUser) {
    return this.userRepo.findOne(user);
  }

  createUser(user: IUser) {
    return this.userRepo.create(user);
  }
}
