import { BaseEntity } from 'src/config/base.entity';
import { Document } from '../interfaces/document.interface';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ProfileEntity } from 'src/modules/profile/entities/profile.entity';
import { DocumentTypeEntity } from './document-type.entity';
import { InternshipDocumentEntity } from './internship-document.entity';

@Entity({ name: 'document' })
export class DocumentEntity extends BaseEntity implements Document {
	@Column()
	file_url: string;

	@ManyToOne(() => DocumentTypeEntity, (documentType) => documentType.document)
	@JoinColumn({ name: 'document_type_id' })
	documentType: DocumentTypeEntity;
	@OneToMany(() => InternshipDocumentEntity, (internshipDocument) => internshipDocument.document)
	internshipDocument: InternshipDocumentEntity;
}
