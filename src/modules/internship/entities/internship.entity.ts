import { BaseEntity } from 'src/config/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Internship } from '../interfaces/internship.interface';
import { StudentEntity } from 'src/modules/student/entities/student.entity';
import { CompanyEntity } from './company.entity';

@Entity({ name: 'internship' })
export class InternshipEntity extends BaseEntity implements Internship {
	@Column()
	start_date: Date;
	@Column()
	end_date: Date;
	@Column()
	position: string;
	@Column()
	description: string;
	@Column()
	hours: number;

	@ManyToOne(() => StudentEntity, (student) => student.internship)
	student: StudentEntity;
	@ManyToOne(() => CompanyEntity, (company) => company.internship)
	company: CompanyEntity;
}
