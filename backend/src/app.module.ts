import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ShortLinksModule } from './short-links/short-links.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseConfig } from './config/database.config';
import { PaginationModule } from './pagination/pagination.module';

@Module({
  imports: [
    DatabaseConfig,
    UsersModule,
    ShortLinksModule,
    AuthModule,
    PaginationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
