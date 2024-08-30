import { BaseEntity } from 'src/config/base.entity';
import { Document } from '../interfaces/document.interface';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ProfileEntity } from 'src/modules/profile/entities/profile.entity';

@Entity({ name: 'document' })
export class DocumentEntity extends BaseEntity implements Document {
	@Column()
	title: string;
	@Column()
	description: string;
	@Column()
	file_url: string;
	@ManyToOne(() => ProfileEntity, (profile) => profile.document)
	profile: ProfileEntity;
}
