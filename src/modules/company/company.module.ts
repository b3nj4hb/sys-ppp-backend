import { Module } from '@nestjs/common';
import { CompanyController } from './controllers/company.controller';
import { CompanyService } from './services/company.service';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService]
})
export class CompanyModule {}
