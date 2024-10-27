import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CompanyEntity } from './company.entity';
import { BaseEntity } from 'src/config/base.entity';

@Entity({ name: 'company_contact' })
export class CompanyContactEntity extends BaseEntity {
	@Column()
	first_name: string;
	@Column()
	last_name_father: string;
	@Column()
	last_name_mother: string;
	@Column()
	academic_degree: string;
	@Column()
	position_representative: string;
	@Column()
	phone: string;
	@Column()
	email: string;
	@Column()
	dni: string;

	@ManyToOne(() => CompanyEntity, (company) => company.company_contact)
	@JoinColumn({ name: 'company_id' })
	company: CompanyEntity;
}
