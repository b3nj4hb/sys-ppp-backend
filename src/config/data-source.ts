import { DataSource } from 'typeorm';
import { join } from 'path';

if (!process.env.DB_HOST || !process.env.DB_PORT || !process.env.DB_USERNAME || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
	throw new Error('Faltan una o más variables de entorno necesarias');
}

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT, 10),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	entities: [join(__dirname, '/../modules/**/entities/*.entity{.ts,.js}')],
	migrations: [join(__dirname, '/../migrations/*{.ts,.js}')],
	synchronize: false,
	logging: true,
});
