import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvConfig } from './env.config';
import { Users } from '../users/users.entity';
import { ShortLinks } from '../short-links/short-links.entity';

export const DatabaseConfig = TypeOrmModule.forRoot({
  type: 'mysql',
  host: EnvConfig.database.host,
  port: EnvConfig.database.port,
  username: EnvConfig.database.username,
  password: EnvConfig.database.password,
  database: EnvConfig.database.name,
  entities: [Users, ShortLinks],
  synchronize: true,
});
