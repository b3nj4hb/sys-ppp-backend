import { BaseEntity } from 'src/config/base.entity';
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
} from 'typeorm';
import { Student } from '../interfaces/student.interface';
import { InternshipEntity } from 'src/modules/internship/entities/internship.entity';
import { ProfileEntity } from 'src/modules/profile/entities/profile.entity';
import { AcademicCycleEntity } from './academic_cycle.entity';

@Entity({ name: 'student' })
export class StudentEntity extends BaseEntity implements Student {
	@Column()
	student_status: boolean;

	@OneToMany(() => InternshipEntity, (internship) => internship.student)
	internship: InternshipEntity[];
	@OneToOne(() => ProfileEntity)
	@JoinColumn({ name: 'profile_id' })
	profile: ProfileEntity;
	@ManyToOne(
		() => AcademicCycleEntity,
		(academic_cycle) => academic_cycle.student,
	)
	@JoinColumn({ name: 'academic_cycle_id' })
	academic_cycle: AcademicCycleEntity;
}
