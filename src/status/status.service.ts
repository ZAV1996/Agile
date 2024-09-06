import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from './entities/status.entity';
import { Repository } from 'typeorm';
import { CreateOrUpdateStatusInput } from './inputs/createOrUpdate.input';
import { Path } from '@nestjs/config';
import { StatusPathService } from 'src/status-path/status-path.service';
import { CondService } from 'src/cond/cond.service';
import { InputID } from 'src/workflow/inputs/create.input';

@Injectable()
export class StatusService {
    constructor(
        @InjectRepository(Status) private statusRepo: Repository<Status>,
        private condService: CondService,
        private pathService: StatusPathService
    ) { }

    async createStatus(input: CreateOrUpdateStatusInput) {
        const cond = await this.condService.createOrUpdateCond({
            groups: [{ ID: 2 }],
        })
        const path = await this.pathService.createPath()
        return await this.statusRepo.save({ ...input, cond, title: input.title, path })
    }

    async updateStatus(input: CreateOrUpdateStatusInput) {
        return await this.statusRepo.save(input)
    }
    async getAllStatuses() {
        return await this.statusRepo.find({ relations: ["path", "parent"] })
    }

    async deleteStatus({ ID }: InputID) {
        return (await this.statusRepo.delete({ ID })).raw
    }

}

