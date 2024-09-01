import { BaseEntity } from 'src/config/base.entity';
import { DimensionEvaluation } from '../interfaces/dimension-evaluation.interface';
import { DimensionStructureEntity } from 'src/modules/evaluation-structure/entities/dimension-structure.entity';
import { EvaluationEntity } from './evaluation.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { QuestionEvaluationEntity } from './question-evaluation.entity';

@Entity({ name: 'dimension_evaluation' })
export class DimensionEvaluationEntity extends BaseEntity implements DimensionEvaluation {
	@ManyToOne(() => EvaluationEntity, (evaluation) => evaluation.dimensionEvaluation)
	@JoinColumn({ name: 'evaluation_id' })
	evaluation: EvaluationEntity;
	@ManyToOne(() => DimensionStructureEntity, (dimensionStructure) => dimensionStructure.dimensionEvaluation)
	@JoinColumn({ name: 'dimension_structure_id' })
	dimensionStructure: DimensionStructureEntity;
	@Column({ nullable: true })
	dimensionScore: number | null;

	@OneToMany(() => QuestionEvaluationEntity, (questionEvaluation) => questionEvaluation.dimensionEvaluation)
	questionEvaluation: QuestionEvaluationEntity[];
}
