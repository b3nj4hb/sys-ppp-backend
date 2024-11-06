import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TemplatesEntity } from '../entities/templates.entity';
import { TemplateDto } from '../dto/templates.dto';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { R2Client } from '../../../config/cloudflare-r2.config';

@Injectable()
export class TemplatesService {
	constructor(
		@InjectRepository(TemplatesEntity)
		private readonly templatesRepository: Repository<TemplatesEntity>,
	) {}

	async uploadTemplate(file: Express.Multer.File, templateDto: TemplateDto): Promise<TemplatesEntity> {
		const { name, description } = templateDto;
		const templateId = `${Date.now()}-${file.originalname}`;
		const templateUrl = `${process.env.DEV_BUCKET_URL}/${templateId}`;

		// Subir el archivo al bucket de R2
		const command = new PutObjectCommand({
			Bucket: process.env.BUCKET,
			Key: templateId,
			Body: file.buffer,
			ContentType: file.mimetype,
		});
		await R2Client.send(command);

		// Crear el registro en la base de datos
		const template = this.templatesRepository.create({
			name,
			description,
			templateUrl,
		});
		return await this.templatesRepository.save(template);
	}
}
