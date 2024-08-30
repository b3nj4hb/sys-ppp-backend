import { Module } from '@nestjs/common';
import { ProfileController } from './controllers/profile.controller';
import { ProfileService } from './services/profile.service';
import { RolService } from './services/rol.service';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService, RolService]
})
export class ProfileModule {}
