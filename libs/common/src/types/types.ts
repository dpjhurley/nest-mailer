/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "email";

export interface Email {
  to: string;
  cc: string;
  subject: string;
  body: string;
  from: string;
}

export interface SendEmail {
  to: string;
  cc: string;
  subject: string;
  body: string;
}

export interface SendEmailResponse {
  success: boolean;
  message: string;
}

export const EMAIL_PACKAGE_NAME = "email";

export interface EmailServiceClient {
  sendEmail(request: SendEmail): Observable<SendEmailResponse>;
}

export interface EmailServiceController {
  sendEmail(request: SendEmail): Promise<SendEmailResponse> | Observable<SendEmailResponse> | SendEmailResponse;
}

export function EmailServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["sendEmail"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("EmailService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("EmailService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const EMAIL_SERVICE_NAME = "EmailService";
