import { BaseEntity } from '../../../config/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Internship } from '../interfaces/internship.interface';
import { StudentEntity } from '../../student/entities/student.entity';
import { CompanyEntity } from '../../company/entities/company.entity';
import { InternshipDocumentEntity } from '../../internship-document/entities/internship-document.entity';
import { EvaluationEntity } from '../../evaluation/entities/evaluation.entity';

@Entity({ name: 'internship' })
export class InternshipEntity extends BaseEntity implements Internship {
	@Column()
	start_date: Date;
	@Column()
	end_date: Date;
	@Column()
	position: string;
	@Column()
	description: string;
	@Column({ nullable: true })
	hours: number;
	@Column({ type: 'enum', enum: ['pending', 'approved', 'rejected'], default: 'pending' })
	status: 'pending' | 'approved' | 'rejected';

	@ManyToOne(() => StudentEntity, (student) => student.internship)
	@JoinColumn({ name: 'student_id' })
	student: StudentEntity;
	@ManyToOne(() => CompanyEntity, (company) => company.internship)
	@JoinColumn({ name: 'company_id' })
	company: CompanyEntity;
	@OneToMany(() => InternshipDocumentEntity, (internshipDocument) => internshipDocument.internship)
	internshipDocument: InternshipDocumentEntity[];
	evaluation: EvaluationEntity[];
}
