import { DimensionStructureEntity } from '../../evaluation-structure/entities/dimension-structure.entity';
import { EvaluationEntity } from '../entities/evaluation.entity';

export interface DimensionEvaluation {
	evaluation: EvaluationEntity;
	dimensionStructure: DimensionStructureEntity;
	dimensionScore: number | null;
}
