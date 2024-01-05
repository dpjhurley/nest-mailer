import { Injectable, Logger } from '@nestjs/common';
import { SendEmail, SendEmailResponse } from '@app/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendEmail(sendEmail: SendEmail): Promise<SendEmailResponse> {
    const logger = new Logger();

    try {
      logger.log({ to: sendEmail.to }, 'ABOUT TO SEND MESSAGE');
      await this.mailerService.sendMail({
        to: sendEmail.to,
        subject: sendEmail.subject,
        // text: 'Welcome',
        // html: '<p>Welcome</p>',
        template: './welcomeEmail',
        // // context adds in dynamic parameters to your template
        context: {
          username: 'daniel',
        },
      });

      return {
        success: true,
        message: 'Email sent successfully',
      };
    } catch (err) {
      logger.error({ err }, 'FAILED TO SEND MESSAGE');
      if (err instanceof Error) {
        return {
          success: false,
          message: err.message,
        };
      }

      return {
        success: false,
        message: 'Internal server error',
      };
    }
  }
}
