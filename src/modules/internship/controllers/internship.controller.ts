import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InternshipService } from '../services/internship.service';
import { CompanyDto, InternshipDto } from '../dto/internship.dto';

@Controller('internship')
export class InternshipController {
	constructor(private readonly internshipService: InternshipService) {}
}
