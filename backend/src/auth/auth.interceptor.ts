import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { EnvConfig } from '../config/env.config';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request: Request = context.switchToHttp().getRequest();

    if (request.url.includes('auth') || request.url.includes('decode')) {
      return next.handle();
    }

    if (!(await this.verifyRequestHeaders(request))) {
      throw new UnauthorizedException();
    }

    return next.handle();
  }

  private async verifyRequestHeaders(request: Request) {
    const jwtHeader = EnvConfig.jwt.header;
    if (request.headers[jwtHeader]) {
      const res = await this.authService.validateAuthToken(
        request.headers[jwtHeader],
      );

      if (!res.userId) {
        return false;
      }

      if (!(await this.userService.getUser({ id: res.userId }))) {
        return false;
      }

      request['userId'] = res.userId;
      return true;
    }

    return false;
  }
}
