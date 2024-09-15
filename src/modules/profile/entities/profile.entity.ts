import { BaseEntity } from 'src/config/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Profile } from '../interfaces/profile.interface';
import { RoleEntity } from './role.entity';
import { DocumentEntity } from 'src/modules/internship-document/entities/document.entity';
import { EvaluationEntity } from 'src/modules/evaluation/entities/evaluation.entity';
import { StudentEntity } from 'src/modules/student/entities/student.entity';

@Entity({ name: 'profile' })
export class ProfileEntity extends BaseEntity implements Profile {
	@Column()
	username: string;
	@Column()
	email: string;
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

	@OneToOne(() => StudentEntity, (student) => student.profile)
	student: StudentEntity;
	@ManyToOne(() => RoleEntity, (role) => role.profile)
	role: RoleEntity;
	@OneToMany(() => DocumentEntity, (document) => document.profile)
	document: DocumentEntity[];
	evaluation: EvaluationEntity[];
}
