import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  EMAIL_SERVICE_NAME,
  EmailServiceClient,
  SendEmailDto,
} from '@app/common';
import { EMAIL_SERVICE } from './constant';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class EmailService implements OnModuleInit {
  private emailService: EmailServiceClient;

  constructor(@Inject(EMAIL_SERVICE) private client: ClientGrpc) {}

  onModuleInit() {
    this.emailService =
      this.client.getService<EmailServiceClient>(EMAIL_SERVICE_NAME);
  }

  sendEmail(sendEmailDto: SendEmailDto) {
    // Should do some checking about the inputs, maybe from some middleware
    return this.emailService.sendEmail(sendEmailDto);
  }
}
