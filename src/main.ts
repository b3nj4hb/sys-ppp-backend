import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CORS } from './constants';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';
import { SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfig } from './config/swagger.config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// enable cors
	app.enableCors(CORS);

	// Serving static files
	app.use('/public', express.static(join(__dirname, '..', 'public')));

	// swagger
	const document = SwaggerModule.createDocument(app, SwaggerConfig);
	SwaggerModule.setup('', app, document, { customCssUrl: '/public/swagger-dark.css' });

	// dto validations
	app.useGlobalPipes(new ValidationPipe());

	// port config
	await app.listen(process.env.PORT, '0.0.0.0');
}
bootstrap();
