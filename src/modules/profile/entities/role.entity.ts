import { BaseEntity } from 'src/config/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { Role } from '../interfaces/role.interface';

@Entity({ name: 'role' })
export class RoleEntity extends BaseEntity implements Role {
	@Column()
	name: string;
	@Column()
	description: string;
	@OneToMany(() => ProfileEntity, (profile) => profile.role)
	profile: ProfileEntity[];
}
