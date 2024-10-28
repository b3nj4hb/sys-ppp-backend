import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CompanyEntity } from '../entities/company.entity';
import { CompanyDto } from '../dto/company.dto';
import { BasicCompanyContactDto, CompanyContactDto, InfoCompanyContactDto } from '../dto/company-contact.dto';
import { CompanyContactEntity } from '../entities/company-contact.entity';

@Injectable()
export class CompanyService {
	constructor(
		private readonly httpService: HttpService,
		@InjectRepository(CompanyEntity)
		private readonly companyRepository: Repository<CompanyEntity>,
		@InjectRepository(CompanyContactEntity)
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

		return {
			message: 'Person details found, using external API',
			person_details: this.partialContactDto(response.data),
		};
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

	//TODO: Manejar si el contacto ya existe
	async createCompanyContact(CompanyContactDto: CompanyContactDto): Promise<CompanyEntity> {
		const doesCompanyContactExist = await this.validateCompanyContactByDNI(CompanyContactDto.dni);

		if (doesCompanyContactExist) {
			throw new Error('Company contact already exists');
		}

		const newCompanyContact = this.companyContactRepository.create(CompanyContactDto);
		const savedCompanyContact = await this.companyContactRepository.save(newCompanyContact);
		return {
			message: 'Company contact created',
			company_contact: savedCompanyContact,
		} as any;
	}

	async updateCompanyContact(dni: string, updateData: Partial<CompanyContactDto>): Promise<CompanyContactEntity> {
		const companyContact = await this.companyContactRepository.findOne({ where: { dni } });

		if (!companyContact) {
			throw new NotFoundException('Company contact not found');
		}

		Object.assign(companyContact, updateData);
		const updatedCompanyContact = await this.companyContactRepository.save(companyContact);

		return {
			message: 'Company contact updated',
			company_contact: updatedCompanyContact,
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

	private partialContactDto(apiResponse: any): BasicCompanyContactDto {
		const partialDto = new CompanyContactDto();
		partialDto.names = apiResponse.nombres;
		partialDto.lastname = apiResponse.apellidoPaterno;
		partialDto.second_lastname = apiResponse.apellidoMaterno;
		partialDto.dni = apiResponse.dni;
		return partialDto;
	}

	async getCompanyByRUC(ruc: string): Promise<CompanyEntity | null> {
		const company = await this.companyRepository.createQueryBuilder('company').where('company.ruc = :ruc', { ruc }).getOne();
		return company || null;
	}

	async getCompanyContactByDNI(dni: string): Promise<CompanyContactEntity | null> {
		const companyContact = await this.companyContactRepository.createQueryBuilder('company_contact').where('company_contact.dni = :dni', { dni }).getOne();
		return {
			message: companyContact ? 'Company contact found' : 'Company contact not found',
			company_contact: companyContact || null,
		} as any;
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

	async getCompanyContactData(dni: string): Promise<any> {
		const doesCompanyContactExist = await this.validateCompanyContactByDNI(dni);

		if (doesCompanyContactExist) {
			return await this.getCompanyContactByDNI(dni);
		}

		const companyContactDetails = await this.getPersonDetailsByDNI(dni);
		return companyContactDetails;
	}
}
