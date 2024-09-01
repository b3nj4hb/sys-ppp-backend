import { Module } from '@nestjs/common';
import { ProfileController } from './controllers/profile.controller';
import { ProfileService } from './services/profile.service';
import { RoleService } from './services/role.service';

@Module({
	controllers: [ProfileController],
	providers: [ProfileService, RoleService],
})
export class ProfileModule {}
