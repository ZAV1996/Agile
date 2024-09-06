import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Path } from './entities/path.entity';
import { PathInput } from './inputs/path.input';

@Injectable()
export class StatusPathService {
    constructor(
        @InjectRepository(Path) private pathRepo: Repository<Path>
    ) { }

    async getAllPath() {
        return await this.pathRepo.find()
    }

    async updatePath(input: PathInput) {
        const path = await this.pathRepo.findOneBy({ID: input.ID})
        path!.from = input.from
        path!.to = input.to
        return await this.pathRepo.save(path!)
    }

    async createPath() {
        return await this.pathRepo.save({ from: [], to: [] })
    }
}
