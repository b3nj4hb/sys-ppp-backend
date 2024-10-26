import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CompanyDto {
	@ApiProperty({
		description: 'Name of the company',
		example: 'Tech Solutions Inc.',
	})
	@IsNotEmpty()
	@IsString()
	company_name: string;

	@ApiProperty({
		description: 'Direction of the company',
		example: '123 Main St',
	})
	@IsNotEmpty()
	@IsString()
	direction: string;

	@ApiProperty({
		description: 'District of the company',
		example: 'Downtown',
	})
	@IsNotEmpty()
	@IsString()
	district: string;

	@ApiProperty({
		description: 'Province of the company',
		example: 'California',
	})
	@IsNotEmpty()
	@IsString()
	province: string;

	@ApiProperty({
		description: 'RUC of the company',
		example: '12345678901',
	})
	@IsNotEmpty()
	@IsString()
	ruc: string;
}
