import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class AuthDto {
	@ApiProperty({
		description: 'Email del usuario',
		example: 'user@example.com',
	})
	@IsNotEmpty()
	@IsEmail({}, { message: 'Formato de email incorrecto' })
	email: string;

	@ApiProperty({
		description: 'Contraseña del usuario',
		example: 'StrongPassword123!',
	})
	@IsNotEmpty()
	@IsString()
	@MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
	password: string;
}
