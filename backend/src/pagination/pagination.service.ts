import { Injectable } from '@nestjs/common';
import { IPagination, IPaginationOptions } from './pagination.interface';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class PaginationService<T> {
  constructor(private readonly model: Repository<any>) {}

  async paginate(options: IPaginationOptions): Promise<IPagination<T>> {
    const { page, where } = options;
    const perPage = Number(page) || 1;
    const limit = 10;
    const offset = (perPage - 1) * limit;

    const findOptions: FindManyOptions<T> = {
      take: limit,
      skip: offset,
      where,
      order: { createdAt: 'DESC' } as any,
      cache: true,
    };

    const [items, total] = await this.model.findAndCount(findOptions);
    const totalPages = Math.ceil(total / limit);

    return {
      data: items,
      pagination: {
        current: perPage,
        previous: perPage > 1 ? perPage - 1 : null,
        next: perPage < totalPages ? perPage + 1 : null,
        total: totalPages,
      },
    };
  }
}
