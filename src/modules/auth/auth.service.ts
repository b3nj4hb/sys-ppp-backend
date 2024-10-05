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

	async validateUser(authDto: AuthDto): Promise<Omit<Profile, 'password'> | null> {
		const { email, password } = authDto;
		const user = await this.findUserByEmail(email);

		if (user && (await bcrypt.compare(password, user.password.replace('$2y$', '$2b$')))) {
			const { password, ...result } = user;
			return result as Omit<Profile, 'password'>;
		}
		return null;
	}

	private async findUserByEmail(email: string): Promise<ProfileEntity | undefined> {
		try {
			return await this.profileRepository.findOne({
				where: { email },
			});
		} catch (error) {
			console.error('Error al buscar un usuario por email:', error);
			throw new Error('Error al buscar el usuario');
		}
	}

	async login(user: Omit<Profile, 'password'>): Promise<{ access_token: string }> {
		const payload = { ...user, sub: user.code };

		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
