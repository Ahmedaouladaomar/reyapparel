import { MailerAsyncOptions } from "@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface"
import { ConfigService } from "@nestjs/config";

const mail = process.env.MAIL_SENDER;
const password = process.env.MAIL_APPILCATION_PASSWORD;
const domain = process.env.MAIL_DOMAIN;

export const mailConfig: MailerAsyncOptions = {
    useFactory: (configService: ConfigService) => ({
        transport: `smtps://${configService.get<string>('MAIL_SENDER')}:${configService.get<string>('MAIL_APPILCATION_PASSWORD')}@smtp.${configService.get<string>('MAIL_DOMAIN')}.com`,
        defaults: {
          from: '"Reyappareal support" <reyappareal@support.com>',
        }
    }),
    inject: [ConfigService]
}