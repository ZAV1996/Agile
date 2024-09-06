import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { CryptoService } from "src/crypto-module/crypto.service";
import { SessionService } from "src/session/session.service";


@Injectable()
export class AccessGuard implements CanActivate {
    constructor(
        private crypto: CryptoService,
        private sessionService: SessionService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const accessToken = context.getArgByIndex(2).req.cookies.accessToken;
        const session_uuid = context.getArgByIndex(2).req.cookies.session_uuid;
        const session = await this.sessionService.findSessionByUUID(session_uuid);
        if (session) {
            if (session.accessToken === accessToken) {
                return await this.crypto.compareAccessToken(accessToken);
            } else {
                await this.sessionService.abortSession(session);
                return false;
            }
        } else {
            return false
        }
    }

}