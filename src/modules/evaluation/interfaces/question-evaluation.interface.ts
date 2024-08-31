import { QuestionStructureEntity } from 'src/modules/evaluation-structure/entities/question-structure.entity';
import { DimensionEvaluationEntity } from '../entities/dimension-evaluation.entity';

export interface QuestionEvaluation {
	dimensionEvaluation: DimensionEvaluationEntity;
	questionStructure: QuestionStructureEntity;
	score: number | null;
}
