import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from '../profile/profile.module';
import { ProfileEntity } from '../profile/entities/profile.entity';

@Module({
	controllers: [AuthController],
	providers: [AuthService],
	imports: [TypeOrmModule.forFeature([ProfileEntity]), ProfileModule],
})
export class AuthModule {}
