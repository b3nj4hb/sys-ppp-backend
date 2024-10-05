import { Module } from '@nestjs/common';
import { StudentService } from './services/student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './entities/student.entity';
import { AcademicCycleEntity } from './entities/academic_cycle.entity';
import { ProfileModule } from '../profile/profile.module';
import { StudentController } from './controllers/student.controller';

@Module({
	providers: [StudentService],
	imports: [TypeOrmModule.forFeature([StudentEntity, AcademicCycleEntity]), ProfileModule],
	controllers: [StudentController],
	exports: [TypeOrmModule],
})
export class StudentModule {}
