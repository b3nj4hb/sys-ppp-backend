import { DocumentBuilder } from '@nestjs/swagger';

export const SwaggerConfig = new DocumentBuilder()
	.setTitle(process.env.SWAGGER_TITLE || 'Documentación de la API de gestión de prácticas')
	.setDescription(process.env.SWAGGER_DESCRIPTION || 'Documentación API para la aplicación de Gestión de Prácticas')
	.setVersion(process.env.SWAGGER_VERSION || '1.0')
	.addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'jwt')
	.build();
