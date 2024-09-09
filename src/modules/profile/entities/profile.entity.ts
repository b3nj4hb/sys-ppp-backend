import { BaseEntity } from 'src/config/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Profile } from '../interfaces/profile.interface';
import { RoleEntity } from './role.entity';
import { DocumentEntity } from 'src/modules/internship-document/entities/document.entity';
import { EvaluationEntity } from 'src/modules/evaluation/entities/evaluation.entity';

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

	@ManyToOne(() => RoleEntity, (role) => role.profile)
	@JoinColumn({ name: 'role_id' })
	role: RoleEntity;
	@OneToMany(() => DocumentEntity, (document) => document.profile)
	document: DocumentEntity[];
	evaluation: EvaluationEntity[];
}
