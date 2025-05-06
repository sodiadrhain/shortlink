/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from '../config/database.config';
import { AuthController } from '../auth/auth.controller';
import { ShortLinksController } from './short-links.controller';
import { Users } from '../users/users.entity';
import { ShortLinks } from './short-links.entity';
import { ShortLinksService } from './short-links.service';
import { UsersService } from '../users/users.service';
import { AuthService } from '../auth/auth.service';
import { ShortLinksRepository } from './short-links.repository';
import { UsersRepository } from '../users/users.repository';
import {
  generateRandomEmail,
  generateStrongPassword,
  getRandomString,
} from '../common/utils/random.util';
import { JwtModule } from '@nestjs/jwt';
import { PaginationModule } from '../pagination/pagination.module';

describe('Shortlinks Test', () => {
  let authController: AuthController;
  let shortLinksService: ShortLinksService;
  let userId: string;
  let userEmail: string;
  let userPassword: string;
  let userName: string;
  let shortLink: string;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseConfig,
        TypeOrmModule.forFeature([Users, ShortLinks]),
        JwtModule,
        PaginationModule.forModels([ShortLinks]),
      ],
      controllers: [AuthController, ShortLinksController],
      providers: [
        ShortLinksService,
        UsersService,
        AuthService,
        ShortLinksRepository,
        UsersRepository,
      ],
    }).compile();

    authController = app.get<AuthController>(AuthController);
    shortLinksService = app.get<ShortLinksService>(ShortLinksService);
  });

  it('should register a new user', async () => {
    // Create User
    userEmail = generateRandomEmail();
    userName = getRandomString(6);
    userPassword = generateStrongPassword(10);
    const res = await authController.register({
      name: userName,
      email: userEmail,
      password: userPassword,
    });

    expect(res.status).toBe('success');
    expect(res.data.email).toBe(userEmail);
    expect(res.data.name).toBe(userName);
  });

  it('should login a registered user', async () => {
    // Login existing user
    const res = await authController.login({
      email: userEmail,
      password: userPassword,
    });

    expect(res.status).toBe('success');
    expect(res.data.token).toBeDefined();
    expect(res.data.user.id).toBeDefined();
    expect(res.data.user.email).toBe(userEmail);

    userId = res.data.user.id;
  });

  it('should encode url', async () => {
    const link = 'http://www.google.com';
    const res = await shortLinksService.encodeLink(userId, { link });

    expect(res.status).toBe('success');
    expect(res.data.id).toBeDefined();
    expect(res.data.userId).toBe(userId);
    expect(res.data.shortLinkCode).toBeDefined();
    expect(res.data.fullLink).toBe(link);
    expect(res.message).toBe('Link shortened successfully');

    shortLink = res.data.shortLinkCode;
  });

  it('should decode shortlink', async () => {
    const res = await shortLinksService.decodeLink({
      shortLinkCode: shortLink,
    });

    expect(res.status).toBe('success');
    expect(res.data.id).toBeDefined();
    expect(res.data.userId).toBe(userId);
    expect(res.data.shortLinkCode).toBe(shortLink);
    expect(res.data.fullLink).toBeDefined();
    expect(res.message).toBe('Link fetched successfully');
  });
});
