import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CompanyEntity } from '../entities/company.entity';
import { CompanyDto } from '../dto/company.dto';

@Injectable()
export class CompanyService {
	constructor(
		private readonly httpService: HttpService,
		@InjectRepository(CompanyEntity)
		private readonly companyRepository: Repository<CompanyEntity>,
	) {}

	async getCompanyDetailsByRUC(ruc: string) {
		const apiUrl = `${process.env.API_PERU_RUC}${ruc}`;
		const apiKey = process.env.API_PERU_KEY;

		const response = await firstValueFrom(
			this.httpService.get(apiUrl, {
				headers: {
					Authorization: `Bearer ${apiKey}`,
				},
			}),
		);

		if (!response || response.status !== 200) {
			throw new NotFoundException('Company details not found');
		}

		return this.adaptToCompanyDto(response.data);
	}

	async validateCompanyByRUC(ruc: string): Promise<boolean> {
		const company = await this.companyRepository.createQueryBuilder('company').where('company.ruc = :ruc', { ruc }).getOne();
		return !!company;
	}

	async createCompany(companyDto: CompanyDto): Promise<CompanyEntity> {
		const newCompany = this.companyRepository.create(companyDto);
		const savedCompany = await this.companyRepository.save(newCompany);
		return {
			message: 'Company created',
			company: savedCompany,
		} as any;
	}

	private adaptToCompanyDto(apiResponse: any): CompanyDto {
		const companyDto = new CompanyDto();
		companyDto.company_name = apiResponse.razonSocial;
		companyDto.direction = apiResponse.direccion;
		companyDto.district = apiResponse.distrito;
		companyDto.province = apiResponse.provincia;
		companyDto.ruc = apiResponse.ruc;
		return companyDto;
	}

	async getCompanyByRUC(ruc: string): Promise<CompanyEntity | null> {
		const company = await this.companyRepository.createQueryBuilder('company').where('company.ruc = :ruc', { ruc }).getOne();
		return company || null;
	}

	async processCompanyByRUC(ruc: string): Promise<CompanyEntity> {
		const doesCompanyExist = await this.validateCompanyByRUC(ruc);

		if (doesCompanyExist) {
			return {
				message: 'Company exists',
				company: await this.getCompanyByRUC(ruc),
			} as any;
		}

		const companyDetails = await this.getCompanyDetailsByRUC(ruc);
		return await this.createCompany(companyDetails);
	}
}
