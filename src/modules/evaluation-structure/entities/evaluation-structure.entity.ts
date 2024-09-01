import { BaseEntity } from 'src/config/base.entity';
import { EvaluationEntity } from 'src/modules/evaluation/entities/evaluation.entity';
import { EvaluationStructure } from '../interfaces/evaluation-structure.interface';
import { Column, Entity, OneToMany } from 'typeorm';
import { DimensionStructureEntity } from './dimension-structure.entity';

@Entity({ name: 'evaluation_structure' })
export class EvaluationStructureEntity extends BaseEntity implements EvaluationStructure {
	@Column()
	name: string;
	@Column({ nullable: true })
	description: string;

	@OneToMany(() => EvaluationEntity, (evaluation) => evaluation.evaluationStructure)
	evaluation: EvaluationEntity[];
	@OneToMany(() => DimensionStructureEntity, (dimensionStructure) => dimensionStructure.evaluationStructure)
	dimensionStructure: DimensionStructureEntity[];
}
