import { DimensionEvaluationEntity } from 'src/modules/evaluation/entities/dimension-evaluation.entity';
import { EvaluationStructureEntity } from './evaluation-structure.entity';

export class DimensionStructureEntity {
	dimensionEvaluation: DimensionEvaluationEntity[];
	evaluationStructure: EvaluationStructureEntity;
}
