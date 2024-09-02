import { Module } from '@nestjs/common';
import { StudentService } from './services/student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './entities/student.entity';
import { AcademicCycleEntity } from './entities/academic_cycle.entity';
import { ProfileModule } from '../profile/profile.module';

@Module({
	providers: [StudentService],
	imports: [TypeOrmModule.forFeature([StudentEntity, AcademicCycleEntity]), ProfileModule],
})
export class StudentModule {}
