import { DocumentBuilder } from '@nestjs/swagger';

export const SwaggerConfig = new DocumentBuilder()
	.setTitle('Internship Management API Documentation')
	.setDescription('API documentation for the Internship Management application')
	.setVersion('1.0')
	.build();
