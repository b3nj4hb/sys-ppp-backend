import { Controller, Post, Body, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TemplateDto } from '../dto/templates.dto';
import { TemplatesService } from '../services/templates.service';

@Controller('templates')
export class TemplatesController {
	constructor(private readonly templatesService: TemplatesService) {}

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
