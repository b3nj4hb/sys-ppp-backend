import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CORS } from './constants';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors(CORS);
	await app.listen(3000);
}
bootstrap();
