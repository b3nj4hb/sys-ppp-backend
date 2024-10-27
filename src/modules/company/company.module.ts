import { Module } from '@nestjs/common';
import { CompanyController } from './controllers/company.controller';
import { CompanyService } from './services/company.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from './entities/company.entity';
import { CompanyContactEntity } from './entities/company-contact.entity';

@Module({
	imports: [TypeOrmModule.forFeature([CompanyEntity, CompanyContactEntity]), HttpModule],
	controllers: [CompanyController],
	providers: [CompanyService],
})
export class CompanyModule {}
