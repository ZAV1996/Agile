import { Injectable } from '@nestjs/common';
import { CreateSessionInput } from './dto/create-session.input';
import { UpdateSessionInput } from './dto/update-session.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session) private sessionRepository: Repository<Session>,
  ) { }

  async createSession(createSessionInput: CreateSessionInput, uuid: string) {
    return await this.sessionRepository.save({ ...createSessionInput, uuid });
  }
  
  async abortSession(session: Session): Promise<DeleteResult> {
    return await this.sessionRepository.delete(session)
  }

  async findSessionByUUID(uuid: string) {
    return await this.sessionRepository.findOneBy({ uuid });
  }

  async findSessionByRToken(refreshToken: string) {
    return await this.sessionRepository.findOneBy({ refreshToken });
  }
}
