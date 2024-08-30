import { BaseEntity } from 'src/config/base.entity';
import { DocumentType } from '../interfaces/document-type.interface';
import { Column, Entity, OneToMany } from 'typeorm';
import { DocumentEntity } from './document.entity';

@Entity({ name: 'document_type' })
export class DocumentTypeEntity extends BaseEntity implements DocumentType {
	@Column()
	name: string;
	@Column()
	description: string;

	@OneToMany(() => DocumentEntity, (document) => document.documentType)
	document: DocumentEntity[];
}
