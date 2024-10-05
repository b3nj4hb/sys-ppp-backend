import { Controller, Post, Body, UnauthorizedException, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	@ApiOperation({ summary: 'Autenticar usuario y devolver token JWT' })
	@HttpCode(HttpStatus.OK)
	async login(@Body() user: AuthDto): Promise<{ access_token: string }> {
		const validatedUser = await this.authService.validateUser(user);

		if (!validatedUser) {
			throw new UnauthorizedException('Credenciales incorrectas');
		}

		return this.authService.login(validatedUser);
	}
}
