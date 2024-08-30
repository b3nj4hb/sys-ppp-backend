import { Module } from '@nestjs/common';
import { StudentService } from './services/student.service';

@Module({
  providers: [StudentService]
})
export class StudentModule {}
