import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class AuthDto {
	@ApiProperty({
		description: 'Email of the user',
		example: 'user@example.com',
	})
	@IsNotEmpty()
	@IsString()
	email: string;

	@ApiProperty({
		description: 'Password of the user',
		example: 'strongPassword123',
	})
	@IsNotEmpty()
	@IsString()
	password: string;
}
