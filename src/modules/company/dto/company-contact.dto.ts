import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsPhoneNumber } from 'class-validator';

export class CompanyContactDto {
	@ApiProperty({
		description: 'First name of the representative',
		example: 'John',
	})
	@IsNotEmpty()
	@IsString()
	first_name: string;

	@ApiProperty({
		description: "Father's last name of the representative",
		example: 'Doe',
	})
	@IsNotEmpty()
	@IsString()
	last_name_father: string;

	@ApiProperty({
		description: "Mother's last name of the representative",
		example: 'Smith',
	})
	@IsNotEmpty()
	@IsString()
	last_name_mother: string;

	@ApiProperty({
		description: 'Academic degree of the representative',
		example: 'PhD in Computer Science',
	})
	@IsNotEmpty()
	@IsString()
	academic_degree: string;

	@ApiProperty({
		description: 'Position of the representative',
		example: 'Chief Technology Officer',
	})
	@IsNotEmpty()
	@IsString()
	position_representative: string;

	@ApiProperty({
		description: 'Phone number of the representative',
		example: '+1234567890',
	})
	@IsNotEmpty()
	@IsPhoneNumber()
	phone: string;

	@ApiProperty({
		description: 'Email of the representative',
		example: 'johndoe@example.com',
	})
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@ApiProperty({
		description: 'DNI of the representative',
		example: '12345678',
	})
	@IsNotEmpty()
	@IsString()
	dni: string;
}

export class PartialCompanyContactDto implements Pick<CompanyContactDto, 'dni' | 'first_name' | 'last_name_father' | 'last_name_mother'> {
	@ApiProperty({
		description: 'DNI of the representative',
		example: '12345678',
	})
	@IsNotEmpty()
	@IsString()
	dni: string;

	@ApiProperty({
		description: 'First name of the representative',
		example: 'John',
	})
	@IsNotEmpty()
	@IsString()
	first_name: string;

	@ApiProperty({
		description: "Father's last name of the representative",
		example: 'Doe',
	})
	@IsNotEmpty()
	@IsString()
	last_name_father: string;

	@ApiProperty({
		description: "Mother's last name of the representative",
		example: 'Smith',
	})
	@IsNotEmpty()
	@IsString()
	last_name_mother: string;
}

export class RemainingCompanyContactDto implements Omit<CompanyContactDto, 'dni' | 'first_name' | 'last_name_father' | 'last_name_mother'> {
	@ApiProperty({
		description: 'Academic degree of the representative',
		example: 'PhD in Computer Science',
	})
	@IsNotEmpty()
	@IsString()
	academic_degree: string;

	@ApiProperty({
		description: 'Position of the representative',
		example: 'Chief Technology Officer',
	})
	@IsNotEmpty()
	@IsString()
	position_representative: string;

	@ApiProperty({
		description: 'Phone number of the representative',
		example: '+1234567890',
	})
	@IsNotEmpty()
	@IsPhoneNumber()
	phone: string;

	@ApiProperty({
		description: 'Email of the representative',
		example: 'johndoe@example.com',
	})
	@IsNotEmpty()
	@IsEmail()
	email: string;
}
