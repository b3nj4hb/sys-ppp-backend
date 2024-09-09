import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CORS } from './constants';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// enable cors
	app.enableCors(CORS);

	// dto validations
	app.useGlobalPipes(new ValidationPipe());

	// port config
	await app.listen(3000);
}
bootstrap();
