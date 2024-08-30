import { BaseEntity } from 'src/config/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Intership } from '../interfaces/intership.interface';
import { StudentEntity } from 'src/modules/student/entities/student.entity';
import { CompanyEntity } from './company.entity';

@Entity({ name: 'intership' })
export class IntershipEntity extends BaseEntity implements Intership {
	@Column()
	start_date: Date;
	@Column()
	end_date: Date;
	@Column()
	position: string;
	@Column()
	description: string;

	@ManyToOne(() => StudentEntity, (student) => student.intership)
	student: StudentEntity;
	@ManyToOne(() => CompanyEntity, (company) => company.intership)
	company: CompanyEntity;
}
