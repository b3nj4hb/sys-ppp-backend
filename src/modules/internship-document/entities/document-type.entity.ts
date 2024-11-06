import { BaseEntity } from 'src/config/base.entity';
import { DocumentType } from '../interfaces/document-type.interface';
import { Column, Entity, OneToMany } from 'typeorm';
import { InternshipDocumentEntity } from './internship-document.entity';

@Entity({ name: 'document_type' })
export class DocumentTypeEntity extends BaseEntity implements DocumentType {
	@Column()
	name: string;
	@Column()
	description: string;

	@OneToMany(() => InternshipDocumentEntity, (internshipDocument) => internshipDocument.documentType)
	internshipDocument: InternshipDocumentEntity[];
}
