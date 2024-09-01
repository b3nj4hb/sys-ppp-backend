import { EvaluationStructureEntity } from '../entities/evaluation-structure.entity';

export interface DimensionStructure {
	evaluationStructure: EvaluationStructureEntity;
	name: string;
	order: number;
}
