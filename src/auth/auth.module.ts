import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from 'src/users/users.module';
import { SmtpSendlerModule } from 'src/smtp-sendler/smtp-sendler.module';
import { CryptoModule } from 'src/crypto-module/crypto.module';
import { SessionModule } from 'src/session/session.module';
import { GroupsModule } from 'src/groups/groups.module';
import { AccessGuard } from 'src/common/guards/access.guard';

@Module({
  providers: [AuthResolver, AuthService, AccessGuard],
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => SessionModule),
    forwardRef(() => CryptoModule),
    forwardRef(() => SmtpSendlerModule),
    forwardRef(() => GroupsModule),
  ],
  exports: [
    AuthService,
    SessionModule,
    CryptoModule,
    SmtpSendlerModule
  ]
})
export class AuthModule { }
