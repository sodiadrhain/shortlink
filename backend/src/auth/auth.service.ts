import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { hashPassword, decryptPassword } from '../common/utils/password.util';
import { sendSuccess } from '../common/utils/response.util';
import { UsersService } from '../users/users.service';
import { RegisterUserDto, LoginUserDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { EnvConfig } from '../config/env.config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(createUserData: RegisterUserDto) {
    const user = await this.userService.getUser({
      email: createUserData.email,
    });
    if (user) {
      throw new BadRequestException('User already exists');
    }

    const newUser = await this.userService.createUser({
      name: createUserData.name,
      email: createUserData.email,
      password: await hashPassword(createUserData.password),
    });

    return sendSuccess(
      {
        email: newUser.email,
        name: newUser.name,
      },
      'Registration successfully',
    );
  }

  async loginUser(loginUserData: LoginUserDto) {
    const user = await this.userService.getUser({ email: loginUserData.email });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // validate password
    if (!(await decryptPassword(loginUserData.password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    return sendSuccess(
      {
        user: {
          email: user.email,
          id: user.id,
        },
        token: await this.generateAuthToken({
          userId: user.id,
        }),
      },
      'Login successfully',
    );
  }

  async generateAuthToken(payload: object) {
    try {
      const token = await this.jwtService.signAsync(payload, {
        secret: EnvConfig.jwt.secret,
        expiresIn: EnvConfig.jwt.expiry,
      });
      return token;
    } catch (error) {
      throw new InternalServerErrorException('jwt sign error', error);
    }
  }

  async validateAuthToken(token: string) {
    try {
      const tokenData: { userId: string } = await this.jwtService.verifyAsync(
        token,
        {
          secret: EnvConfig.jwt.secret,
        },
      );
      return tokenData;
    } catch (error) {
      throw new UnauthorizedException('Unauthorized access', error);
    }
  }
}
