import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/database.config';
import { ProfileModule } from './modules/profile/profile.module';
import { StudentModule } from './modules/student/student.module';
import { IntershipModule } from './modules/intership/intership.module';

@Module({
	imports: [TypeOrmModule.forRoot(typeOrmConfig), ProfileModule, StudentModule, IntershipModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
