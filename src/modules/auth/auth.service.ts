import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ProfileEntity } from '../profile/entities/profile.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDto } from './auth.dto';
import { Profile } from '../profile/interfaces/profile.interface';

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,

		@InjectRepository(ProfileEntity)
		private readonly profileRepository: Repository<ProfileEntity>,
	) {}

	async validateUser(authDto: AuthDto): Promise<any> {
		const { email, password } = authDto;
		const user = await this.findUserByEmail(email);
		if (user && (await bcrypt.compare(password, user.password.replace('$2y$', '$2b$')))) {
			const { password, ...result } = user;
			return result;
		}
		return null;
	}

	private async findUserByEmail(email: string): Promise<any> {
		return await this.profileRepository.findOne({
			where: { email: email },
			relations: ['role'],
		});
	}

	async login(user: Profile): Promise<any> {
		const { password, ...userWithoutPassword } = user;
		const payload = { ...userWithoutPassword, sub: user.code };
		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
