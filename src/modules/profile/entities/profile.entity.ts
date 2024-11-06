import { BaseEntity } from '../../../config/base.entity';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { Profile } from '../interfaces/profile.interface';
import { EvaluationEntity } from '../../evaluation/entities/evaluation.entity';
import { StudentEntity } from '../../student/entities/student.entity';

@Entity({ name: 'profile' })
export class ProfileEntity extends BaseEntity implements Profile {
	@Column()
	username: string;
	@Column()
	email: string;
	@Column({ nullable: true })
	password: string;
	@Column()
	first_name: string;
	@Column()
	middle_name: string;
	@Column()
	last_name: string;
	@Column()
	second_last_name: string;
	@Column()
	code: string;
	@Column({ nullable: true })
	phone: string;
	@Column({ nullable: true })
	avatar_url: string;
	@Column({ type: 'enum', enum: ['student', 'admin', 'secretary'], default: 'student' })
	role: 'student' | 'admin' | 'secretary';

	@OneToOne(() => StudentEntity, (student) => student.profile)
	student: StudentEntity;
	evaluation: EvaluationEntity[];
}
