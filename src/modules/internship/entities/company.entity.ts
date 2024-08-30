import { BaseEntity } from 'src/config/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Company } from '../interfaces/company.interface';
import { InternshipEntity } from './internship.entity';

@Entity({ name: 'company' })
export class CompanyEntity extends BaseEntity implements Company {
	@Column()
	name: string;
	@Column()
	address: string;
	@Column()
	contact_person: string;
	@Column()
	contact_email: string;

	@OneToMany(() => InternshipEntity, (internship) => internship.company)
	internship: InternshipEntity[];
}
