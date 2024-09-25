import { Column, Entity, OneToMany } from 'typeorm';
import { Company } from '../interfaces/company.interface';
import { InternshipEntity } from './internship.entity';

@Entity({ name: 'company' })
export class CompanyEntity implements Company {
	@Column()
	company_name: string;
	@Column()
	state: string;
	@Column()
	direction: string;
	@Column()
	distric: string;
	@Column()
	province: string;

	@OneToMany(() => InternshipEntity, (internship) => internship.company)
	internship: InternshipEntity[];
}
