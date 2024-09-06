import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { CryptoService } from "src/crypto-module/crypto.service";
import { SessionService } from "src/session/session.service";


@Injectable()
export class RefreshGuard implements CanActivate {
    constructor(
        private crypto: CryptoService,
        private sessionService: SessionService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const refresh = context.getArgByIndex(2).req.cookies.refreshToken;
        const session_uuid = context.getArgByIndex(2).req.cookies.session_uuid;
        const session = await this.sessionService.findSessionByUUID(session_uuid);
        if (session) {
            if (session.refreshToken === refresh) {
                return await this.crypto.compareRefreshToken(refresh);
            } else {
                await this.sessionService.abortSession(session);
                return false;
            }
        } else {
            return false
        }
    }

}