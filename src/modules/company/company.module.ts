import { Module } from '@nestjs/common';
import { CompanyController } from './controllers/company.controller';
import { CompanyService } from './services/company.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from './entities/company.entity';

@Module({
	imports: [TypeOrmModule.forFeature([CompanyEntity]), HttpModule],
	controllers: [CompanyController],
	providers: [CompanyService],
})
export class CompanyModule {}
