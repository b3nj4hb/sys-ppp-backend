import { Controller, Post, Body, UploadedFile, UseInterceptors, BadRequestException, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TemplateDto } from '../dto/templates.dto';
import { TemplatesService } from '../services/templates.service';
import { Get } from '@nestjs/common';
import { TemplatesEntity } from '../entities/templates.entity';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('templates')
export class TemplatesController {
	constructor(private readonly templatesService: TemplatesService) {}

	@UseGuards(JwtAuthGuard)
	@Get()
	async getAllTemplates(): Promise<TemplatesEntity[]> {
		return await this.templatesService.getAllTemplates();
	}

	@UseGuards(JwtAuthGuard)
	@Post('upload')
	@UseInterceptors(FileInterceptor('file'))
	async uploadTemplate(@Body() templateDto: TemplateDto, @UploadedFile() file: Express.Multer.File) {
		if (!file) {
			throw new BadRequestException('File is required');
		}

		const template = await this.templatesService.uploadTemplate(file, templateDto);

		return {
			message: 'Template uploaded successfully',
			template,
		};
	}
}
