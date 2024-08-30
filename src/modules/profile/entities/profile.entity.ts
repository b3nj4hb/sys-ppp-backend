import { BaseEntity } from 'src/config/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Profile } from '../interfaces/profile.interface';
import { RolEntity } from './rol.entity';
import { DocumentEntity } from 'src/modules/internship-document/entities/document.entity';

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
	role: RolEntity;
	@OneToMany(() => DocumentEntity, (document) => document.profile)
	document: DocumentEntity[];
}
