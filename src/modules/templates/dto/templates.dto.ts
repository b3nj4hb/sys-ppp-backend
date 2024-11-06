import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TemplateDto {
	@ApiProperty({
		description: 'Name of the template',
		example: 'Internship Document Template',
	})
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty({
		description: 'Description of the template',
		example: 'This is a template for the internship document',
	})
	@IsOptional()
	@IsString()
	description?: string;
}
