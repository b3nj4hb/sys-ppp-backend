import { BaseEntity } from '../../../config/base.entity';
import { Column, Entity } from 'typeorm';
import { Templates } from '../interfaces/templates.interface';

@Entity({ name: 'templates' })
export class TemplatesEntity extends BaseEntity implements Templates {
	@Column()
	name: string;
	@Column({ nullable: true })
	description: string;
	@Column()
	templateUrl: string;
}
