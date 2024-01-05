import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { EmailService } from './email.service';
import {
  EmailServiceController,
  SendEmail,
  EmailServiceControllerMethods,
} from '@app/common';

@Controller()
@EmailServiceControllerMethods()
export class EmailController implements EmailServiceController {
  constructor(private readonly emailService: EmailService) {}

  @MessagePattern('sendEmail')
  sendEmail(sendEmail: SendEmail) {
    return this.emailService.sendEmail(sendEmail);
  }
}
