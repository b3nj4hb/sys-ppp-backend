import { Module } from '@nestjs/common';
import { ProfileController } from './controllers/profile.controller';
import { ProfileService } from './services/profile.service';
import { RoleService } from './services/role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';

@Module({
	controllers: [ProfileController],
	providers: [ProfileService, RoleService],
	imports: [TypeOrmModule.forFeature([RoleEntity])],
})
export class ProfileModule {}
