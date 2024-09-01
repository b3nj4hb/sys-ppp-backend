import { BaseEntity } from 'src/config/base.entity';
import { QuestionEvaluationEntity } from 'src/modules/evaluation/entities/question-evaluation.entity';
import { QuestionStructure } from '../interfaces/question-structure.interface';
import { DimensionStructureEntity } from './dimension-structure.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'question_structure' })
export class QuestionStructureEntity extends BaseEntity implements QuestionStructure {
	@Column()
	text: string;
	@Column()
	order: number;

	@ManyToOne(() => DimensionStructureEntity, (dimensionStructure) => dimensionStructure.questionStructure)
	dimensionStructure: DimensionStructureEntity;
	@OneToMany(() => QuestionEvaluationEntity, (questionEvaluation) => questionEvaluation.questionStructure)
	questionEvaluation: QuestionEvaluationEntity[];
}
