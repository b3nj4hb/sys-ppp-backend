import { DimensionEvaluationEntity } from 'src/modules/evaluation/entities/dimension-evaluation.entity';
import { EvaluationStructureEntity } from './evaluation-structure.entity';
import { BaseEntity } from 'src/config/base.entity';
import { DimensionStructure } from '../interfaces/dimension-structure.interface';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { QuestionStructureEntity } from './question-structure.entity';

@Entity({ name: 'dimension_structure' })
export class DimensionStructureEntity extends BaseEntity implements DimensionStructure {
	@Column()
	name: string;
	@Column({ type: 'tinyint' })
	order: number;

	@ManyToOne(() => EvaluationStructureEntity, (evaluationStructure) => evaluationStructure.dimensionStructure)
	@JoinColumn({ name: 'evaluation_structure_id' })
	evaluationStructure: EvaluationStructureEntity;
	@OneToMany(() => DimensionEvaluationEntity, (dimensionEvaluation) => dimensionEvaluation.dimensionStructure)
	dimensionEvaluation: DimensionEvaluationEntity[];
	@OneToMany(() => QuestionStructureEntity, (questionStructure) => questionStructure.dimensionStructure)
	questionStructure: QuestionStructureEntity[];
}
