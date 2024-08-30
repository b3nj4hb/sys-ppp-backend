import { BaseEntity } from 'src/config/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { Rol } from '../interfaces/rol.interface';

@Entity({ name: 'role' })
export class RolEntity extends BaseEntity implements Rol {
	@Column()
	name: string;
	@Column()
	description: string;
	@OneToMany(() => ProfileEntity, (profile) => profile.role)
	profile: ProfileEntity[];
}