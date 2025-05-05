import { config } from 'dotenv';

config();

export const EnvConfig = {
  app: {
    name: 'shortlink-backend',
    env: process.env.NODE_ENV,
    port: process.env.PORT ?? 9000,
  },
  database: {
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
  },
  jwt: {
    header: process.env.JWT_HEADER ?? 'x-auth-token',
    secret: process.env.JWT_SECRET ?? '12@@#*#$%(33)',
    expiry: Number(process.env.JWT_EXPIRY) || 3600,
    refresh_header: process.env.JWT_REFRESH_HEADER ?? 'x-refresh-token',
    refresh_secret: process.env.JWT_REFRESH_SECRET ?? '12@@#*#$%(33)@@#*#$%(n',
    refresh_expiry: process.env.JWT_REFRESH_EXPIRY ?? '3d',
  },
  redis: {
    host: process.env.REDIS_HOST,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    port: Number(process.env.REDIS_PORT) || 6379,
    ttl: Number(process.env.REDIS_TTL) || 3600,
  },
};
