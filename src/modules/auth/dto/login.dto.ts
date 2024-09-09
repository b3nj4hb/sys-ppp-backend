import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
	@IsString()
	@IsNotEmpty()
	code: string;

	@IsString()
	@IsNotEmpty()
	password: string;
}
