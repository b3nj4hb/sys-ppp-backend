import { BaseEntity } from 'src/config/base.entity';
import { QuestionEvaluation } from '../interfaces/question-evaluation.interface';
import { QuestionStructureEntity } from 'src/modules/evaluation-structure/entities/question-structure.entity';
import { DimensionEvaluationEntity } from './dimension-evaluation.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'question_evaluation' })
export class QuestionEvaluationEntity extends BaseEntity implements QuestionEvaluation {
	@Column({ type: 'tinyint', nullable: true })
	score: number | null;

	@ManyToOne(() => DimensionEvaluationEntity, (dimensionEvaluation) => dimensionEvaluation.questionEvaluation)
	@JoinColumn({ name: 'dimension_evaluation_id' })
	dimensionEvaluation: DimensionEvaluationEntity;
	@ManyToOne(() => QuestionStructureEntity, (questionStructure) => questionStructure.questionEvaluation)
	@JoinColumn({ name: 'question_structure_id' })
	questionStructure: QuestionStructureEntity;
}
