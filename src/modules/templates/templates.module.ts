import { Module } from '@nestjs/common';
import { TemplatesService } from './services/templates.service';
import { TemplatesController } from './controllers/templates.controller';
import { TemplatesEntity } from './entities/templates.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [TypeOrmModule.forFeature([TemplatesEntity])],
	providers: [TemplatesService],
	controllers: [TemplatesController],
})
export class TemplatesModule {}
