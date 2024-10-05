import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config();

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT, 10),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	entities: [join(__dirname, '/../modules/**/entities/*.entity{.ts,.js}')],
	migrations: [join(__dirname, '/../migrations/*{.ts,.js}')],
	synchronize: false, // Asegúrate de que esto está en false en producción
	logging: true,
});
