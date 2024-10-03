import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const dbConfigOptions: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: () => ({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: ['src/../entities/*{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
    migrationsRun: true,
    autoLoadEntities: true,
    synchronize: false,
  }),
  inject: [ConfigService],
};
