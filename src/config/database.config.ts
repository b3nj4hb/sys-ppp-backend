import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config(); // Carga las variables de entorno del archivo .env

const isDropSchema = process.env.DB_DROP === 'true';
const isSynchronize = process.env.DB_SYNC === 'true';
const isProduction = process.env.NODE_ENV === 'production';

export const typeOrmConfig: TypeOrmModuleOptions = {
	type: process.env.DB_TYPE as any,
	host: isProduction ? process.env.DB_HOST_CLOUD : process.env.DB_HOST_LOCAL,
	port: parseInt(process.env.DB_PORT, 10),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	entities: [__dirname + '/../modules/**/entities/*.entity{.ts,.js}'],
	dropSchema: isDropSchema,
	synchronize: isSynchronize,
	ssl: isProduction ? { rejectUnauthorized: true } : undefined,
};
