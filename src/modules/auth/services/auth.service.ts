// src/modules/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileEntity } from 'src/modules/profile/entities/profile.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(ProfileEntity)
		private profileRepository: Repository<ProfileEntity>,
		private jwtService: JwtService,
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

	async login(user: any) {
		const payload = { username: user.username, sub: user.id };
		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
