import { BaseEntity } from 'src/config/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { InternshipEntity } from 'src/modules/internship/entities/internship.entity';
import { DocumentTypeEntity } from './document-type.entity';

@Entity({ name: 'internship_document' })
export class InternshipDocumentEntity extends BaseEntity {
	@Column({ type: 'enum', enum: ['pending', 'approved', 'rejected'], default: 'pending' })
	approval_status: 'pending' | 'approved' | 'rejected';
	@Column()
	document_url: string;

	@ManyToOne(() => InternshipEntity, (internship) => internship.internshipDocument)
	@JoinColumn({ name: 'internship_id' })
	internship: InternshipEntity;
	@ManyToOne(() => DocumentTypeEntity, (documentType) => documentType.internshipDocument)
	@JoinColumn({ name: 'document_type_id' })
	documentType: DocumentTypeEntity;
}
