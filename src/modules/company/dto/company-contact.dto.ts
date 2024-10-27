import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsPhoneNumber, IsUUID } from 'class-validator';
import { PickType } from '@nestjs/swagger';

export class CompanyContactDto {
	@ApiProperty({
		description: 'DNI of the representative',
		example: '12345678',
	})
	@IsNotEmpty()
	@IsString()
	dni: string;

	@ApiProperty({
		description: 'Names of the representative',
		example: 'John Doe',
	})
	@IsNotEmpty()
	@IsString()
	names: string;

	@ApiProperty({
		description: 'Last name of the representative',
		example: 'Doe',
	})
	@IsNotEmpty()
	@IsString()
	lastname: string;

	@ApiProperty({
		description: 'Second last name of the representative',
		example: 'Smith',
	})
	@IsNotEmpty()
	@IsString()
	second_lastname: string;

	@ApiProperty({
		description: 'Academic degree of the representative',
		example: 'PhD in Computer Science',
		nullable: true,
	})
	@IsString()
	academic_degree?: string;

	@ApiProperty({
		description: 'Position of the representative',
		example: 'Chief Technology Officer',
		nullable: true,
	})
	@IsString()
	position_representative?: string;

	@ApiProperty({
		description: 'Phone number of the representative',
		example: '+1234567890',
		nullable: true,
	})
	@IsString()
	phone?: string;

	@ApiProperty({
		description: 'Email of the representative',
		example: 'johndoe@example.com',
		nullable: true,
	})
	@IsEmail()
	email?: string;

	@ApiProperty({
		description: 'UUID of the company',
		example: '550e8400-e29b-41d4-a716-446655440000',
	})
	@IsNotEmpty()
	@IsUUID()
	company_id?: string;
}

export class BasicCompanyContactDto extends PickType(CompanyContactDto, ['dni', 'names', 'lastname', 'second_lastname'] as const) {}
export class InfoCompanyContactDto extends PickType(CompanyContactDto, ['academic_degree', 'position_representative', 'phone', 'email'] as const) {}
