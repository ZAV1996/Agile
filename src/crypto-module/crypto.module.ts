import { Module } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { JwtModule } from '@nestjs/jwt';


@Module({
    providers: [CryptoService],
    exports: [CryptoService, JwtModule],
    imports: [JwtModule.register({}),]
})
export class CryptoModule { }
