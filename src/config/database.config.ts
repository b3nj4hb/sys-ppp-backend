import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config();

if (!process.env.DB_HOST_LOCAL || !process.env.DB_PORT || !process.env.DB_USERNAME || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
	throw new Error('Faltan una o más variables de entorno necesarias');
}

const isDropSchema = process.env.DB_DROP === 'true';
const isSynchronize = process.env.DB_SYNC === 'true';
const isProduction = process.env.NODE_ENV === 'production';

export const typeOrmConfig: TypeOrmModuleOptions = {
	type: 'postgres',
	host: isProduction ? process.env.DB_HOST_CLOUD : process.env.DB_HOST_LOCAL,
	port: parseInt(process.env.DB_PORT, 10),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	entities: [join(__dirname, '/../modules/**/entities/*.entity{.ts,.js}')],
	migrations: [join(__dirname, '/../migrations/*{.ts,.js}')],
	dropSchema: isDropSchema,
	synchronize: false,
	ssl: isProduction ? { rejectUnauthorized: true } : undefined,
	autoLoadEntities: true,
	migrationsRun: true,
};
