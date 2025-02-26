import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { CustomNamingStrategyForMigration } from './custom.naming.strategy';

dotenv.config();

const MigrationDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_URL,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  entities: ['dist/**/entities/*.entity{.ts,.js}'],
  migrations: ['dist/**/migrations/*{.ts,.js}'],
  namingStrategy: new CustomNamingStrategyForMigration(),
  migrationsTableName: 'migrations',
  migrationsRun: false,
  logging: true,
});

export default MigrationDataSource;
