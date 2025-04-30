import { Controller } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  login() {
    return 'login';
  }

  register() {
    return 'register';
  }

  resfresh() {
    return 'refresh-token';
  }

  encode() {
    return '/api/encode - Encodes a URL to a shortened URL';
  }

  decode() {
    return '/api/decode - Decodes a shortened URL to its original URL';
  }

  statistic() {
    return '/api/statistic/{url_path} - Return basic stat of a short URL path. Using the above link';
  }

  list() {
    return '/api/list - List all available url';
  }

  path() {
    return '/{url_path} - This should redirect the user to the long url.';
  }
}
