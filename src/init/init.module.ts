import { forwardRef, Module } from '@nestjs/common';
import { InitService } from './init.service';
import { GroupsModule } from 'src/groups/groups.module';

@Module({
  providers: [InitService],
  imports: [
    forwardRef(() => GroupsModule),
  ]
})
export class InitModule { }
