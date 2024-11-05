import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TemplateDto {
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsOptional()
	@IsString()
	description?: string;
}
