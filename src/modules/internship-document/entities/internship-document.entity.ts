import { BaseEntity } from 'src/config/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { InternshipEntity } from 'src/modules/internship/entities/internship.entity';
import { DocumentEntity } from './document.entity';

@Entity({ name: 'internship_document' })
export class InternshipDocumentEntity extends BaseEntity {
	@Column({ type: 'enum', enum: ['pending', 'approved', 'rejected'], default: 'pending' })
	approval_status: 'pending' | 'approved' | 'rejected';

	@ManyToOne(() => InternshipEntity, (internship) => internship.internshipDocument)
	@JoinColumn({ name: 'internship_id' })
	internship: InternshipEntity;
	@ManyToOne(() => DocumentEntity, (document) => document.internshipDocument)
	@JoinColumn({ name: 'document_id' })
	document: DocumentEntity;
}
