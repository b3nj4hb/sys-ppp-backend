import { DimensionStructureEntity } from '../entities/dimension-structure.entity';

export interface QuestionStructure {
	dimensionStructure: DimensionStructureEntity;
	text: string;
	order: number;
}
