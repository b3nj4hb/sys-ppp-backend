// src/modules/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileEntity } from 'src/modules/profile/entities/profile.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(ProfileEntity)
		private profileRepository: Repository<ProfileEntity>,
	) {}

	async validateUser(code: string, password: string): Promise<any> {
		const user = await this.profileRepository.findOne({ where: { code } });
		if (user && (await bcrypt.compare(password, user.password))) {
			// Exclude sensitive information
			const { password, ...result } = user;
			return result;
		}
		return null;
	}
}
