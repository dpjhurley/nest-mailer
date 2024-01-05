import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EMAIL_SERVICE } from './constant';
import { EMAIL_PACKAGE_NAME } from '@app/common';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: EMAIL_SERVICE,
        transport: Transport.GRPC,
        options: {
          package: EMAIL_PACKAGE_NAME,
          protoPath: join(__dirname, '../email.proto'),
        },
      },
    ]),
  ],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
