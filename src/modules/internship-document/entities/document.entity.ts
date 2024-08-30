import { BaseEntity } from 'src/config/base.entity';
import { Document } from '../interfaces/document.interface';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ProfileEntity } from 'src/modules/profile/entities/profile.entity';
import { DocumentTypeEntity } from './document-type.entity';
import { InternshipDocumentEntity } from './internship-document.entity';

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
	@ManyToOne(() => DocumentTypeEntity, (documentType) => documentType.document)
	documentType: DocumentTypeEntity;
	@OneToMany(
		() => InternshipDocumentEntity,
		(internshipDocument) => internshipDocument.document,
	)
	internshipDocument: InternshipDocumentEntity;
}
