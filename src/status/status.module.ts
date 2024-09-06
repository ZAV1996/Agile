import { forwardRef, Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusResolver } from './status.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Status } from './entities/status.entity';
import { Cond } from 'src/cond/entities/cond.entity';
import { CondModule } from 'src/cond/cond.module';
import { Path } from 'src/status-path/entities/path.entity';
import { StatusPathModule } from 'src/status-path/status-path.module';

@Module({
  providers: [StatusResolver, StatusService],
  imports: [
    TypeOrmModule.forFeature([Status, Cond, Path]),
    forwardRef(() => CondModule),
    forwardRef(() => StatusPathModule),
  ],
  exports: [StatusService]
})
export class StatusModule { }
