import { BaseEntity } from 'src/config/base.entity';
import { QuestionEvaluation } from '../interfaces/question-evaluation.interface';
import { QuestionStructureEntity } from 'src/modules/evaluation-structure/entities/question-structure.entity';
import { DimensionEvaluationEntity } from './dimension-evaluation.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'question_evaluation' })
export class QuestionEvaluationEntity extends BaseEntity implements QuestionEvaluation {
	@Column({ type: 'tinyint' })
	score: number;

	@ManyToOne(() => DimensionEvaluationEntity, (dimensionEvaluation) => dimensionEvaluation.questionEvaluation)
	dimensionEvaluation: DimensionEvaluationEntity;
	@ManyToOne(() => QuestionStructureEntity, (questionStructure) => questionStructure.questionEvaluation)
	questionStructure: QuestionStructureEntity;
}
