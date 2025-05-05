import { Module, DynamicModule } from '@nestjs/common';
import { PaginationService } from './pagination.service';
import { Repository } from 'typeorm';

@Module({})
export class PaginationModule {
  static forModels<T extends Repository<any>>(entities: any[]): DynamicModule {
    const providers = entities.map((entity) => ({
      provide: entity,
      useFactory: () => new PaginationService<T>(entity),
    }));

    return {
      module: PaginationModule,
      providers,
      exports: providers,
    };
  }
}
