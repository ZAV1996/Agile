import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs'
import { CreateTokenInput } from './dto/createToken.input';
import { JwtService } from '@nestjs/jwt';
import { env } from 'process';
import { CreateSessionInput } from 'src/session/dto/create-session.input';

@Injectable()
export class CryptoService {
    constructor(
        private jwtService: JwtService,
    ) { }
    async hashData(data: string) {
        return await bcrypt.hash(data, 10)
    }

    async getTokens(CreateTokenData: CreateTokenInput): Promise<CreateSessionInput> {
        const [AT, RT] = await Promise.all([
            this.jwtService.signAsync(
                { ...CreateTokenData },
                { expiresIn: "15m", secret: env.PRIVATE_KEY_ACCESS }
            ),
            this.jwtService.signAsync(
                { ...CreateTokenData },
                { expiresIn: "7d", secret: env.PRIVATE_KEY_REFRESH }
            ),
        ])
        return {
            accessToken: AT,
            refreshToken: RT
        }
    }
    async compareRefreshToken(refreshToken: string) {
        return await this.jwtService.verify(refreshToken, { secret: env.PRIVATE_KEY_REFRESH })
    }
    async compareAccessToken(accessToken: string) {
        return await this.jwtService.verify(accessToken, { secret: env.PRIVATE_KEY_ACCESS })
    }
    decodeToken(token: string) {
        return this.jwtService.decode<CreateTokenInput>(token)
    }
}
