import { BaseEntity } from 'src/config/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { AcademicCycle } from '../interfaces/academic_cycle.interface';
import { StudentEntity } from './student.entity';

@Entity({ name: 'academic_cycle' })
export class AcademicCycleEntity extends BaseEntity implements AcademicCycle {
	@Column()
	name: string;
	@Column()
	description: string;

	@OneToMany(() => StudentEntity, (student) => student.academic_cycle)
	student: StudentEntity;
}
