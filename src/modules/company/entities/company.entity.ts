import { Column, Entity, OneToMany } from 'typeorm';
import { InternshipEntity } from '../../internship/entities/internship.entity';
import { CompanyContactEntity } from './company-contact.entity';
import { Company } from '../interfaces/company.interface';
import { BaseEntity } from 'src/config/base.entity';

@Entity({ name: 'company' })
export class CompanyEntity extends BaseEntity implements Company {
	@Column()
	company_name: string;
	@Column()
	direction: string;
	@Column()
	district: string;
	@Column()
	province: string;

	@OneToMany(() => InternshipEntity, (internship) => internship.company)
	internship: InternshipEntity[];

	@OneToMany(() => CompanyContactEntity, (company_contact) => company_contact)
	company_contact: CompanyContactEntity[];
}
