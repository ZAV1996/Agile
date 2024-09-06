import { Module } from '@nestjs/common';
import { StatusPathService } from './status-path.service';
import { StatusPathResolver } from './status-path.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Path } from './entities/path.entity';
import { Status } from 'src/status/entities/status.entity';

@Module({
  providers: [StatusPathService, StatusPathResolver],
  imports: [
    TypeOrmModule.forFeature([Status, Path])
  ],
  exports: [
    StatusPathService
  ]
})
export class StatusPathModule { }
