import { Injectable, OnModuleInit } from '@nestjs/common';
import { GroupsService } from 'src/groups/groups.service';

@Injectable()
export class InitService implements OnModuleInit {
    constructor(
        private groupService: GroupsService
    ) { }
    async onModuleInit() {
        const groups = await this.groupService.getAllGroups();

        if (groups.length === 0) {
            await this.groupService.createGroup({ group_name: "Administrators", description: "Группа администраторов" })
            await this.groupService.createGroup({ group_name: "Users", description: "Default group users" })
        }
    }
}
