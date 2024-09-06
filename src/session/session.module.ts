import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';

@Module({
  providers: [SessionService,],
  exports: [SessionService],
  imports: [
    TypeOrmModule.forFeature([Session])
  ]
})
export class SessionModule { }
