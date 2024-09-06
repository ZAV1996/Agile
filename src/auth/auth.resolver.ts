import { Resolver, Query, Mutation, Args, Context, Info } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { RegisterInput } from './dto/register.input';
import { ConfirmInput } from './dto/confirm.input';
import { LoginInput } from './dto/login.input';
import { ForgotPassInput } from './dto/forgot.dto';
import { ForgotInput } from './dto/Forgot.input';
import { AccessGuard } from 'src/common/guards/access.guard';
import { RefreshGuard } from 'src/common/guards/refresh.guard';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Mutation(() => String)
  async register(@Args({ type: () => RegisterInput, name: "RegisterInput" }) registerDTO: RegisterInput) {
    return await this.authService.register(registerDTO);
  }

  @Mutation(() => Boolean, { nullable: true })
  async confirm(@Args({ name: "ConfirmToken", type: () => ConfirmInput }) confirmToken: ConfirmInput) {
    return await this.authService.confirm(confirmToken)
  }

  @Mutation(() => User, { nullable: true })
  async login(@Args({ type: () => LoginInput, name: "LoginInput" }) loginInput: LoginInput, @Context() ctx: Response) {
    return await this.authService.login(loginInput, ctx);
  }

  @UseGuards(AccessGuard)
  @Mutation(() => Boolean, { nullable: true })
  async logout(@Context() ctx: Response) {
    return this.authService.logout(ctx);
  }

  @Mutation(() => String, { nullable: true })
  async forgot(@Args({ type: () => ForgotPassInput, name: "ForgotPassInput" }) forgotPassInput: ForgotPassInput) {
    return await this.authService.forgot(forgotPassInput);
  }

  @Mutation(() => String, { nullable: true })
  async updatePass(@Args({ type: () => ForgotInput, name: "ForgotInput" }) forgotInput: ForgotInput) {
    const user = await this.authService.updateForgotPass(forgotInput);
    return typeof user === "object" ? "Пароль успешно обновлен" : user
  }

  @UseGuards(RefreshGuard)
  @Mutation(() => Boolean, { nullable: true })
  async refreshToken(@Context() ctx: Response) {
    return await this.authService.refreshToken(ctx);
  }
}
