import { Injectable, NotFoundException } from '@nestjs/common';
import { DecodeLinkDto, EncodeLinkDto } from './short-links.dto';
import { ShortLinksRepository } from './short-links.repository';
import { sendSuccess } from 'src/common/utils/response.util';
import { getRandomString } from 'src/common/utils/random.util';

@Injectable()
export class ShortLinksService {
  constructor(private readonly shortLinksRepo: ShortLinksRepository) {}

  async encodeLink(userId: string, encodeLinkData: EncodeLinkDto) {
    let link = await this.shortLinksRepo.findOne({
      fullLink: encodeLinkData.link,
      userId,
    });

    const shortLinkCode = getRandomString(6);
    link ??= await this.shortLinksRepo.create({
      userId,
      shortLinkCode,
      fullLink: encodeLinkData.link,
    });

    return sendSuccess(link, 'Link shortened successfully');
  }

  async decodeLink(decodeLinkData: DecodeLinkDto) {
    const link = await this.shortLinksRepo.findOne({
      shortLinkCode: decodeLinkData.shortLinkCode,
    });
    if (!link) {
      throw new NotFoundException('Link not found');
    }

    // update link stats since decoded
    link.stats += 1;
    await this.shortLinksRepo.update(link);

    return sendSuccess(link, 'Link fetched successfully');
  }

  async getLinkStats(userId: string, shortLinkCode: string) {
    const link = await this.shortLinksRepo.findOne({
      shortLinkCode,
      userId,
    });
    if (!link) {
      throw new NotFoundException('Link not found');
    }

    return sendSuccess(
      { stats: link.stats },
      'Link statistics fetched successfully',
    );
  }

  async getLinks(userId: string, params: object) {
    const linksList = await this.shortLinksRepo.findAllAndPaginate(
      { userId },
      params,
    );
    return sendSuccess(linksList, 'Links fetched successfully');
  }
}
