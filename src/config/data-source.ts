import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: +configService.get('DB_PORT'),
  username: configService.get('DB_USER') || 'postgres',
  password: configService.get('DB_PASS') || 'MySecr3tPasSword5436',
  database: configService.get('DB_NAME'),
  entities: [`${__dirname}/../**/**/*.entity{.ts,.js}`],
  migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
  synchronize: true,
};
export const dataSource = new DataSource(dataSourceOptions);
