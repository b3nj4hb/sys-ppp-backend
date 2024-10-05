import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CORS } from './constants';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';
import { SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfig } from './config/swagger.config';

async function bootstrap() {
	try {
		const app = await NestFactory.create(AppModule);

		app.enableCors(CORS);

		app.use('/public', express.static(join(__dirname, '..', 'public')));

		const document = SwaggerModule.createDocument(app, SwaggerConfig);
		SwaggerModule.setup('', app, document, { customCssUrl: '/public/swagger-dark.css' });

		app.useGlobalPipes(new ValidationPipe());

		await app.listen(process.env.PORT || 3000, '0.0.0.0');
		console.log(`Application is running on: ${await app.getUrl()}`);
	} catch (error) {
		console.error('Error during application bootstrap', error);
		process.exit(1);
	}
}
bootstrap();
