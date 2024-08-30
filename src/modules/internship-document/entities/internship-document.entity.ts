import { BaseEntity } from 'src/config/base.entity';
import { InternshipDocument } from '../interfaces/internship-document.interface';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { InternshipEntity } from 'src/modules/internship/entities/internship.entity';
import { DocumentEntity } from './document.entity';

@Entity({ name: 'internship_document' })
export class InternshipDocumentEntity
	extends BaseEntity
	implements InternshipDocument
{
	@Column()
	approval_status: boolean;

	@ManyToOne(
		() => InternshipEntity,
		(internship) => internship.internshipDocument,
	)
	@JoinColumn({ name: 'internship_id' })
	internship: InternshipEntity;
	@ManyToOne(() => DocumentEntity, (document) => document.internshipDocument)
	@JoinColumn({ name: 'document_id' })
	document: DocumentEntity;
}
