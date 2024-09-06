import { ForbiddenException, HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcryptjs'
import { SmtpSendlerService } from 'src/smtp-sendler/smtp-sendler.service';
import { Exception } from 'handlebars';
import { CryptoService } from 'src/crypto-module/crypto.service';
import { Response } from 'express';
import { SessionService } from 'src/session/session.service';
import { RegisterInput } from './dto/register.input';
import { ConfirmInput } from './dto/confirm.input';
import { LoginInput } from './dto/login.input';
import { ForgotPassInput } from './dto/forgot.dto';
import { ForgotInput } from './dto/Forgot.input';
import { GroupsService } from 'src/groups/groups.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private smpt: SmtpSendlerService,
    private crypto: CryptoService,
    private sessionService: SessionService,
    private groupService: GroupsService
  ) { }
  ///////////////////////////////////////////////////////
  async register(registerDTO: RegisterInput) {
    const candidate = await this.usersService.getUserByEmail(registerDTO.email);
    if (candidate) {
      throw new HttpException("Пользователь с таким email уже зарегистрирован.", HttpStatus.BAD_REQUEST)
    }
    const uuid = uuidv4();
    const user = await this.usersService.registerUser({ ...registerDTO, activationToken: uuid })
    await this.smpt.sendUserConfirmation(user, uuid)
    return "Вам на почту придет письмо для активации учетной записи."
  }

  async confirm(confirm: ConfirmInput) {
    const user = await this.usersService.getUserByID(confirm.ID);
    if (!user) {
      throw new Exception("Не найден пользвователь")
    }
    if (user.isActivated) {
      throw new Exception("Учетная запись уже активирована")
    }
    if (user.activationToken === confirm.activationToken) {
      const groups = await this.groupService.getAllGroups()
      const Group = groups.find((group) => group.group_name === "Users")
      if (Group) {
        await this.groupService.addUserInGroup(Group.ID, user.ID);
      }
      return (await this.usersService.confirm({ ...user, isActivated: true, activationToken: null })).isActivated;
    }
    else
      throw new Exception("Не верный токен активации учетной записи")
  }

  async login(credintals: LoginInput, ctx: Response) {
    const { refreshToken, session_uuid } = ctx.req.cookies;
    if (session_uuid && refreshToken) {
      const session = await this.sessionService.findSessionByUUID(session_uuid);
      if (session) {
        if (session.refreshToken === refreshToken) {
          const compare = await this.crypto.compareRefreshToken(refreshToken);
          if (compare) {
            throw new ForbiddenException("Вы уже авторизованы");
          } else {
            return await this.createLogin(credintals, ctx);
          }
        } else {
          if (session_uuid) {
            const session = await this.sessionService.findSessionByUUID(session_uuid);
            if (session)
              await this.sessionService.abortSession(session);
          }
          if (refreshToken) {
            const session = await this.sessionService.findSessionByRToken(refreshToken);
            if (session)
              await this.sessionService.abortSession(session);
          }
          return await this.createLogin(credintals, ctx);
        }
      } else {
        if (refreshToken) {
          const session = await this.sessionService.findSessionByRToken(refreshToken);
          if (session)
            await this.sessionService.abortSession(session);
        }
        return await this.createLogin(credintals, ctx);
      }
    } else {
      if (session_uuid) {
        const session = await this.sessionService.findSessionByUUID(session_uuid);
        if (session)
          await this.sessionService.abortSession(session);
      }
      if (refreshToken) {
        const session = await this.sessionService.findSessionByRToken(refreshToken);
        if (session)
          await this.sessionService.abortSession(session);
      }
      return await this.createLogin(credintals, ctx);
    }
  }

  async logout(ctx: Response) {
    const { refreshToken, session_uuid } = ctx.req.cookies;
    const session = await this.sessionService.findSessionByUUID(session_uuid);
    if (session) {
      const res = await this.sessionService.abortSession(session);
      ctx.req.res?.clearCookie("accessToken");
      ctx.req.res?.clearCookie("refreshToken");
      ctx.req.res?.clearCookie("session_uuid");
      if (res)
        return true
      else return false
    } else return false
  }

  async forgot({ email }: ForgotPassInput) {
    const candidate = await this.usersService.getUserByEmail(email);
    if (!candidate) return new UnauthorizedException({ message: "Пользователь в системе не зарегистрирован" });
    const uuid = uuidv4();
    const updateUser = await this.usersService.setActivationToken(candidate, uuid);
    if (updateUser) {
      await this.smpt.sendForgotPasswordMail(updateUser, uuid);
      return "Вам на почту придет с ссылкой на изменение пароля."
    }
  }

  async updateForgotPass(updateForgotPass: ForgotInput) {
    if (updateForgotPass.password === updateForgotPass.double_password) {
      const user = await this.usersService.getUserByID(updateForgotPass.ID);
      if (!user) throw new ForbiddenException("Пользователь не зарегистрирован в системе")
      if (user.activationToken === updateForgotPass.activationToken) {
        return await this.usersService.updatePass(user.ID, await this.crypto.hashData(updateForgotPass.password))
      } else throw new ForbiddenException("Неверный токен восстановления пароля")
    }
    else throw new ForbiddenException("Пароли не совпадают")
  }

  ///////////////////////////////////////////////////////
  async refreshToken(ctx: Response) {
    const refresh_token = ctx.req.cookies.refreshToken;
    const session_uuid = ctx.req.cookies.session_uuid;
    const { ID, email, name, patronymic, surname } = this.crypto.decodeToken(refresh_token);
    const UUID = uuidv4();
    const session = await this.sessionService.findSessionByUUID(session_uuid);
    if (!session) throw new UnauthorizedException("Нет сессии");

    await this.sessionService.abortSession(session);

    const { accessToken, refreshToken } = await this.crypto.getTokens({ email, ID, name, patronymic, surname });

    const new_session = await this.sessionService.createSession({ accessToken, refreshToken }, UUID);
    if (new_session) {
      ctx.req.res?.setHeader(
        "Set-Cookie",
        [
          `accessToken=${new_session.accessToken}; httpOnly; secure; path=/; sameSite=strict`,
          `refreshToken=${new_session.refreshToken}; httpOnly; secure; path=/; sameSite=strict`,
          `session_uuid=${new_session.uuid}; httpOnly; secure; path=/; sameSite=strict`,
        ]
      );
      return true
    } else return false

  }

  private async createLogin(credintals: LoginInput, ctx: Response) {
    const user = await this.validate(credintals);
    const { accessToken, refreshToken } = await this.crypto.getTokens({ email: user.email, ID: user.ID, name: user.name, patronymic: user.patronymic, surname: user.surname });
    const session_uuid = uuidv4();
    const session = await this.sessionService.createSession({ accessToken, refreshToken }, session_uuid);
    if (session)
      ctx.req.res?.setHeader(
        "Set-Cookie",
        [
          `accessToken=${accessToken}; httpOnly; secure; path=/; sameSite=strict`,
          `refreshToken=${refreshToken}; httpOnly; secure; path=/; sameSite=strict`,
          `session_uuid=${session_uuid}; httpOnly; secure; path=/; sameSite=strict`,
        ]
      );
    return user;
  }
  private async validate(credentials: LoginInput) {
    const candidate = await this.usersService.getUserByEmail(credentials.email);
    if (!candidate) {
      throw new UnauthorizedException({ message: "Пользователь с таким email не зарегистрирован." })
    }
    const passwordCorrect = await bcrypt.compare(credentials.password, candidate.password);
    if (!candidate.isActivated && !candidate.activationToken) {
      throw new UnauthorizedException({ message: "Учетная запись заблокирована" })
    }
    if (!candidate.isActivated && candidate.activationToken) {
      throw new UnauthorizedException({ message: "Учетная запись не подтверджена" })
    }
    if (!passwordCorrect)
      throw new UnauthorizedException({ message: "Вы ввели неправильный пароль. Попробуйте снова." })
    else return candidate;
  }

}
