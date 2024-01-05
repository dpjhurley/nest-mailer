import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { join } from 'path';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';

console.log('HERE', join(__dirname, 'email/templates'));
console.log('HERE 2', join(process.cwd(), 'email/templates'));
console.log('HERE 3', join(process.env.PWD, 'email/templates'));
@Module({
  imports: [
    MailerModule.forRoot({
      // Should get from a config.ini file
      // or
      transport: {
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        secure: false,
        auth: {
          user: 'f3ec436ec9d7f9',
          pass: '216a37440eb9c6',
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
      // preview: true,
      template: {
        dir: join(__dirname, 'email/templates'),
        adapter: new PugAdapter(),
        options: {
          strict: false,
        },
      },
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
