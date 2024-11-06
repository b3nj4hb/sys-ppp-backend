import { EvaluationStructureEntity } from '../../evaluation-structure/entities/evaluation-structure.entity';
import { InternshipEntity } from '../../internship/entities/internship.entity';
import { ProfileEntity } from '../../profile/entities/profile.entity';
import { EvaluationTypeEntity } from '../entities/evaluation-type.entity';

export interface Evaluation {
	evaluation_date: string;
	evaluation_hour: string;
	general_score: number | null;
	evaluationType: EvaluationTypeEntity;
	evaluationStructure: EvaluationStructureEntity;
	internship: InternshipEntity;
	evaluator: ProfileEntity;
}
