import { BaseEntity } from 'src/config/base.entity';
import { EvaluationEntity } from './evaluation.entity';
import { EvaluationType } from '../interfaces/evaluation-type.interface';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'evaluation_type' })
export class EvaluationTypeEntity extends BaseEntity implements EvaluationType {
	@Column()
	name: string;

	@OneToMany(() => EvaluationEntity, (evaluation) => evaluation.evaluationType)
	evaluation: EvaluationEntity[];
}
