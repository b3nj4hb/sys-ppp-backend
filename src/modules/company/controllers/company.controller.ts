import { Body, Controller, Get, NotFoundException, Param, Patch, UseGuards } from '@nestjs/common';
import { CompanyService } from '../services/company.service';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';

@Controller('company')
export class CompanyController {
	constructor(private readonly companyService: CompanyService) {}

	@UseGuards(JwtAuthGuard)
	@Get('get-company-remote/:ruc')
	async getCompanyDetailsByRUC(@Param('ruc') ruc: string) {
		return this.companyService.getCompanyDetailsByRUC(ruc);
	}

	@UseGuards(JwtAuthGuard)
	@Get('get-company/:ruc')
	async getCompanyByRUC(@Param('ruc') ruc: string) {
		const company = await this.companyService.getCompanyByRUC(ruc);
		if (!company) {
			throw new NotFoundException(`Company with RUC ${ruc} not found`);
		}
		return company;
	}

	@UseGuards(JwtAuthGuard)
	@Patch('process-company/:ruc')
	async processCompanyByRUC(@Param('ruc') ruc: string) {
		try {
			return await this.companyService.processCompanyByRUC(ruc);
		} catch (error) {
			throw new NotFoundException(error.message);
		}
	}

	@UseGuards(JwtAuthGuard)
	@Get('get-person-remote/:dni')
	async getPersonDetailsByDNI(@Param('dni') dni: string) {
		return this.companyService.getPersonDetailsByDNI(dni);
	}

	@UseGuards(JwtAuthGuard)
	@Get('get-contact/:dni')
	async getCompanyContactByDNI(@Param('dni') dni: string) {
		try {
			return await this.companyService.getCompanyContactByDNI(dni);
		} catch (error) {
			throw new NotFoundException(error.message);
		}
	}
}
