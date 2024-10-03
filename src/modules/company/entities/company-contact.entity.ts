import { Column, Entity, ManyToOne } from 'typeorm';
import { CompanyEntity } from './company.entity';
import { BaseEntity } from 'src/config/base.entity';

@Entity({ name: 'company_contact' })
export class CompanyContactEntity extends BaseEntity implements CompanyContactEntity {
	@Column()
	name_representative: string;
	@Column()
	academic_degree: string;
	@Column()
	position_representative: string;
	@Column()
	phone: string;
	@Column()
	email: string;

	@ManyToOne(() => CompanyEntity, (company) => company.company_contact)
	company: CompanyEntity;
}
