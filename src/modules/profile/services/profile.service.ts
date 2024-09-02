import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileEntity } from '../entities/profile.entity';
import { profileData } from '../seed/profile.seed';
import { RoleService } from './role.service';

@Injectable()
export class ProfileService implements OnModuleInit {
	constructor(
		@InjectRepository(ProfileEntity)
		private readonly profileRepository: Repository<ProfileEntity>,
		private readonly roleService: RoleService, // Inyecta RoleService
	) {}

	async onModuleInit() {
		if (process.env.NODE_ENV !== 'production') {
			// await this.seedProfiles(); // Evitar doble ejecucion
		}
	}
	async seedProfiles() {
		try {
			const roles = await this.roleService.seedRoles(); // Asegúrate de que los roles estén guardados
			const profiles = profileData.profiles;
			const savedProfiles = [];
			for (const profile of profiles) {
				const role = roles.find((r) => r.name === profile.role);
				if (!role) {
					console.error(`Role not found for profile: ${profile.role}`);
					continue;
				}

				const profileEntity = this.profileRepository.create({
					...profile,
					role,
				});
				const savedProfile = await this.profileRepository.save(profileEntity);
				savedProfiles.push(savedProfile);
				console.log(`Profile saved: ${profile.first_name} ${profile.last_name}`);
			}
			return savedProfiles;
		} catch (error) {
			console.error('Error seeding profiles:', error);
		}
	}
}
