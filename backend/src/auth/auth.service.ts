import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hashPassword, decryptPassword } from 'src/common/utils/password.util';
import { sendSuccess } from 'src/common/utils/response.util';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDto, LoginUserDto } from './dtos/auth.dto';
import { JwtService } from '@nestjs/jwt';

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

    const newUser = this.userService.createUser({
      name: createUserData.name,
      email: createUserData.email,
      password: await hashPassword(createUserData.password),
    });

    return sendSuccess(newUser, 'Registration successfully');
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

    return sendSuccess(user, 'Login successfully');
  }
}
