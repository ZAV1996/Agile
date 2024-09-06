import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../users/entities/user.entity';
import * as nodemailer from 'nodemailer'
import { env } from 'process';

@Injectable()
export class SmtpSendlerService {
  constructor(private mailerService: MailerService) { }
  async sendUserConfirmation(user: User | null, token: string) {
    const url = `http://localhost:4000/api/auth/confirm?PER_NUM=${user?.ID}&token=${token}`;
    await this.mailerService.sendMail({
      to: user?.email,
      from: 'prj@uuap.com',
      subject: 'Активация учетной запись',
      template: './confirmation',
      context: {
        name: `${user?.name + ' ' + user?.patronymic}`,
        url,
      },
    });
  }

  async sendForgotPasswordMail(user: User | null, token: string) {
    const url = `http://localhost:4000/api/auth/confirm?PER_NUM=${user?.ID}&token=${token}`;
    await this.mailerService.sendMail({
      to: user?.email,
      from: 'prj@uuap.com',
      subject: 'Активация учетной запись',
      template: './forgot',
      context: {
        name: `${user?.name + ' ' + user?.patronymic}`,
        url,
      },
    });
  }
}
