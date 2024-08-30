import { BaseEntity } from 'src/config/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Company } from '../interfaces/company.interface';
import { IntershipEntity } from './intership.entity';

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

	@OneToMany(() => IntershipEntity, (intership) => intership.company)
	intership: IntershipEntity[];
}
