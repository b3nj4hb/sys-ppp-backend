import { BaseEntity } from 'src/config/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Profile } from '../interfaces/profile.interface';
import { RolEntity } from './rol.entity';
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

	@ManyToOne(() => RolEntity, (role) => role.profile)
	role: RolEntity
	@ManyToOne(() => StudentEntity, (student) => student.profile)
	student: StudentEntity
}