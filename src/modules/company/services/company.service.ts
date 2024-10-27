import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CompanyEntity } from '../entities/company.entity';
import { CompanyDto } from '../dto/company.dto';
import { CompanyContactDto, PartialCompanyContactDto, RemainingCompanyContactDto } from '../dto/company-contact.dto';
import { CompanyContactEntity } from '../entities/company-contact.entity';

@Injectable()
export class CompanyService {
	constructor(
		private readonly httpService: HttpService,
		@InjectRepository(CompanyEntity)
		private readonly companyRepository: Repository<CompanyEntity>,
		@InjectRepository(CompanyEntity)
		private readonly companyContactRepository: Repository<CompanyContactEntity>,
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

	async getPersonDetailsByDNI(dni: string) {
		const apiUrl = `${process.env.API_PERU_DNI}${dni}`;
		const apiKey = process.env.API_PERU_KEY;

		const response = await firstValueFrom(
			this.httpService.get(apiUrl, {
				headers: {
					Authorization: `Bearer ${apiKey}`,
				},
			}),
		);

		if (!response || response.status !== 200) {
			throw new NotFoundException('Person details not found');
		}

		return this.partialContactDto(response.data);
	}

	async validateCompanyByRUC(ruc: string): Promise<boolean> {
		const company = await this.companyRepository.createQueryBuilder('company').where('company.ruc = :ruc', { ruc }).getOne();
		return !!company;
	}

	async validateCompanyContactByDNI(dni: string): Promise<boolean> {
		const companyContact = await this.companyContactRepository.createQueryBuilder('company_contact').where('company_contact.dni = :dni', { dni }).getOne();
		return !!companyContact;
	}

	async createCompany(companyDto: CompanyDto): Promise<CompanyEntity> {
		const newCompany = this.companyRepository.create(companyDto);
		const savedCompany = await this.companyRepository.save(newCompany);
		return {
			message: 'Company created',
			company: savedCompany,
		} as any;
	}

	async createCompanyContact(partialCompanyContactDto: PartialCompanyContactDto, remainingCompanyContactDto: RemainingCompanyContactDto): Promise<CompanyContactEntity> {
		const newCompanyContact = this.companyContactRepository.create({
			...partialCompanyContactDto,
			...remainingCompanyContactDto,
		});
		const savedCompanyContact = await this.companyContactRepository.save(newCompanyContact);
		return {
			message: 'Company contact created',
			company_contact: savedCompanyContact,
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

	private partialContactDto(apiResponse: any): PartialCompanyContactDto {
		const partialDto = new CompanyContactDto();
		partialDto.first_name = apiResponse.nombres;
		partialDto.last_name_father = apiResponse.apellidoPaterno;
		partialDto.last_name_mother = apiResponse.apellidoMaterno;
		partialDto.dni = apiResponse.dni;
		return partialDto;
	}

	async getCompanyByRUC(ruc: string): Promise<CompanyEntity | null> {
		const company = await this.companyRepository.createQueryBuilder('company').where('company.ruc = :ruc', { ruc }).getOne();
		return company || null;
	}

	async getCompanyContactByDNI(dni: string): Promise<CompanyContactEntity | null> {
		const companyContact = await this.companyContactRepository.createQueryBuilder('company_contact').where('company_contact.dni = :dni', { dni }).getOne();
		return companyContact || null;
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

	async processCompanyContactByDNI(dni: string): Promise<CompanyContactEntity> {
		const doesCompanyContactExist = await this.validateCompanyContactByDNI(dni);

		let partialContact: PartialCompanyContactDto;
		if (doesCompanyContactExist) {
			let data = await this.getPersonDetailsByDNI(dni);
			partialContact = data;
			return {
				message: 'Company contact exists',
				company_contact: data,
			} as any;
		}

		const companyContactDetails = await this.getPersonDetailsByDNI(dni);

		// return await this.createCompanyContact(partialContact,);
	}
}
