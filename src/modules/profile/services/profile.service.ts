import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileEntity } from '../entities/profile.entity';

@Injectable()
export class ProfileService {
	constructor(
		@InjectRepository(ProfileEntity)
		private readonly profileRepository: Repository<ProfileEntity>,
	) {}
}
