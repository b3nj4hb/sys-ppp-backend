import { Injectable, OnModuleInit } from '@nestjs/common';
import { roleData } from '../seed/role.seed';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from '../entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService implements OnModuleInit {
	constructor(
		@InjectRepository(RoleEntity)
		private readonly roleRepository: Repository<RoleEntity>,
	) {}

	async onModuleInit() {
		if (process.env.NODE_ENV !== 'production') {
			await this.seedRoles();
		}
	}

	async seedRoles() {
		try {
			// Inserta roles
			const roles = roleData.roles;
			const savedRoles = [];
			for (const role of roles) {
				const RoleEntity = this.roleRepository.create(role);
				const savedRole = await this.roleRepository.save(RoleEntity);
				savedRoles.push(savedRole);
				console.log(`Role saved: ${role.name}`);
			}
			return savedRoles;
		} catch (error) {
			console.error('Error seeding data:', error);
		}
	}
}
