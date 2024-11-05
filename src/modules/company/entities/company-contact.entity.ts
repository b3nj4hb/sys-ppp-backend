import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CompanyEntity } from './company.entity';
import { BaseEntity } from 'src/config/base.entity';
import { CompanyContact } from '../interfaces/company-contact.interface';

@Entity({ name: 'company_contact' })
export class CompanyContactEntity extends BaseEntity implements CompanyContact {
	@Column()
	dni: string;
	@Column()
	names: string;
	@Column()
	lastname: string;
	@Column()
	second_lastname: string;
	@Column()
	academic_degree: string;
	@Column()
	position_representative: string;
	@Column()
	phone: string;
	@Column()
	email: string;

	@ManyToOne(() => CompanyEntity, (company) => company.company_contact)
	@JoinColumn({ name: 'company_id' })
	company: CompanyEntity;
}
