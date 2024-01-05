import { NestFactory } from '@nestjs/core';
import { MailerModule } from './mailer.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { EMAIL_PACKAGE_NAME } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MailerModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../email.proto'),
        package: EMAIL_PACKAGE_NAME,
      },
    },
  );
  await app.listen();
}
bootstrap();
