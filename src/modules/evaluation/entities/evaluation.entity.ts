import { BaseEntity } from 'src/config/base.entity';
import { Evaluation } from '../interfaces/evaluation.interface';
import { EvaluationStructureEntity } from 'src/modules/evaluation-structure/entities/evaluation-structure.entity';
import { InternshipEntity } from 'src/modules/internship/entities/internship.entity';
import { ProfileEntity } from 'src/modules/profile/entities/profile.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { EvaluationTypeEntity } from './evaluation-type.entity';
import { DimensionEvaluationEntity } from './dimension-evaluation.entity';

@Entity({ name: 'evaluation' })
export class EvaluationEntity extends BaseEntity implements Evaluation {
	@Column({ type: 'date' })
	evaluation_date: string;
	@Column({ type: 'time' })
	evaluation_hour: string;
	@Column({ nullable: true })
	general_score: number | null;

	@ManyToOne(() => EvaluationTypeEntity, (evaluationType) => evaluationType.evaluation)
	@JoinColumn({ name: 'evaluation_type_id' })
	evaluationType: EvaluationTypeEntity;
	@ManyToOne(() => EvaluationStructureEntity, (evaluationStructure) => evaluationStructure.evaluation)
	@JoinColumn({ name: 'evaluation_structure_id' })
	evaluationStructure: EvaluationStructureEntity;
	@ManyToOne(() => InternshipEntity, (internship) => internship.evaluation)
	@JoinColumn({ name: 'internship_id' })
	internship: InternshipEntity;
	@ManyToOne(() => ProfileEntity, (profile) => profile.evaluation)
	@JoinColumn({ name: 'evaluator_id' })
	evaluator: ProfileEntity;
	@OneToMany(() => DimensionEvaluationEntity, (dimensionEvaluation) => dimensionEvaluation.evaluation)
	dimensionEvaluation: DimensionEvaluationEntity;
}
