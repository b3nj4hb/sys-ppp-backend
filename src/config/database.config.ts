import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config(); // Carga las variables de entorno del archivo .env

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
	entities: [join(__dirname, '/../modules/**/entities/*.entity{.ts,.js}')], // Ruta a tus entidades
	migrations: [join(__dirname, '/../migrations/*{.ts,.js}')], // Añadir ruta para migraciones
	dropSchema: isDropSchema,
	synchronize: false, // Usar migraciones en vez de `synchronize`
	ssl: isProduction ? { rejectUnauthorized: true } : undefined,
	autoLoadEntities: true, // Cargar automáticamente las entidades
	migrationsRun: true, // Ejecutar migraciones automáticamente al arrancar la app
};
