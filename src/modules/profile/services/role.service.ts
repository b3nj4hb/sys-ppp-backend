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
			// await this.seedRoles(); // Evitar dbble ejecucion
		}
	}

	async seedRoles() {
		try {
			const savedRoles = [];
			for (const role of roleData.roles) {
				const existingRole = await this.roleRepository.findOne({
					where: { name: role.name },
				});
				if (!existingRole) {
					const roleEntity = this.roleRepository.create(role);
					const savedRole = await this.roleRepository.save(roleEntity);
					savedRoles.push(savedRole);
					console.log(`Role saved: ${role.name}`);
				} else {
					console.log(`Role already exists: ${role.name}`);
					savedRoles.push(existingRole);
				}
			}
			return savedRoles;
		} catch (error) {
			console.error('Error seeding roles:', error);
		}
	}
}
