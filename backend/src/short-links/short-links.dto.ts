/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class EncodeLinkDto {
  @IsNotEmpty({ message: 'Link must not be empty' })
  @IsUrl({}, { message: 'Invalid url passed' })
  link: string;
}

export class DecodeLinkDto {
  @IsNotEmpty({ message: 'Short link code must not be empty' })
  @IsString({ message: 'Short link code must be string' })
  short_link_code: string;
}
