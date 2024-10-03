import { Module } from '@nestjs/common';
import { ProfileController } from './controllers/profile.controller';
import { ProfileService } from './services/profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from './entities/profile.entity';

@Module({
	controllers: [ProfileController],
	providers: [ProfileService],
	imports: [TypeOrmModule.forFeature([ProfileEntity])],
	exports: [ProfileService, TypeOrmModule],
})
export class ProfileModule {}
