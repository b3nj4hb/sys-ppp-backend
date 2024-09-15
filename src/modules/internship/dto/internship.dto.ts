// internship.dto.ts
export class InternshipDto {
	studentId: string;
	companyId: string;
	position: string;
	description: string;
	startDate: Date;
	endDate: Date;
	hours: number;
}

export class StudentDto {
	names: string;
	surnames: string;
	code: string;
	cycle: string;
}

export class CompanyDto {
	name: string;
	contact_person: string;
	academic_degree: string;
	position: string;
	address: string;
	contact_email: string;
}
