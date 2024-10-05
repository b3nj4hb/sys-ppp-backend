import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.get<string>('JWT_SECRET'),
		});

		if (!configService.get<string>('JWT_SECRET')) {
			throw new Error('JWT_SECRET no está definido en las variables de entorno');
		}
	}

	async validate(payload: any): Promise<{ userId: string; username: string }> {
		if (!payload) {
			throw new UnauthorizedException('Token invalido');
		}
		return { userId: payload.sub, username: payload.username };
	}
}
