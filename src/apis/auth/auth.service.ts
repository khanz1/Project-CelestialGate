import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { SignUpDto } from './dto/sign-up.dto';
import { MailerService } from '@nestjs-modules/mailer';
import mjml2html from 'mjml';
import { ConfigService } from '@nestjs/config';
import { UniqueConstraintError, ValidationError } from 'sequelize';
import { Helper } from './auth.helper';
import { SignInDto } from './dto/sign-in.dto';
import * as url from 'url';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly CLIENT_URL = this.configService.get<string>('CLIENT_URL');
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    private helper: Helper,
  ) {}
  async signUp(data: SignUpDto) {
    const newUser = data as Partial<User>;
    newUser.password = this.helper.hashPassword(data.password);
    newUser.status = 'on-boarding';

    try {
      const user = await this.userModel.create(newUser);

      const URI = url.format({
        pathname: `${this.CLIENT_URL}/auth/validate`,
        query: { uid: user.uid },
      });

      this.logger.log(`Validation URL: ${URI} will be sent to ${user.email}`);
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Welcome to UniApp',
        html: mjml2html(`
          <mjml>
            <mj-body>
              <mj-section>
                <mj-column>
                  <mj-text> Hello ${user.username}</mj-text>
                  <mj-text> Here is your validation URL: ${URI}</mj-text>
                  <mj-text> Thanks!!!</mj-text>
                </mj-column>
              </mj-section>
            </mj-body>
          </mjml>`).html,
      });
      return {
        accessToken: await this.helper.signToken({ uid: user.uid }),
      };
    } catch (err) {
      console.log(err);
      if (
        err instanceof UniqueConstraintError ||
        err instanceof ValidationError
      ) {
        throw new BadRequestException({
          message: err.errors[0].message,
        });
      } else {
        throw new InternalServerErrorException({
          message: 'Internal Server Error',
        });
      }
    }
  }

  async signIn(data: SignInDto) {
    this.logger.log(`Sign in with ${JSON.stringify(data)}`);
    let user: Partial<User>;
    try {
      if (!data.username && !data.email) {
        throw new BadRequestException({
          message: 'Username or email is required',
        });
      }
      if (data.username) {
        user = await this.userModel.findOne({
          where: { username: data.username },
        });
      }

      if (data.email) {
        user = await this.userModel.findOne({ where: { email: data.email } });
      }

      if (!user) {
        throw new UnauthorizedException({
          message: 'Username/Email or password is wrong',
        });
      }

      console.log(user);
      const isPasswordMatch = this.helper.comparePassword(
        data.password,
        user.password,
      );
      if (!isPasswordMatch) {
        throw new UnauthorizedException({
          message: 'Username/Email or password is wrong',
        });
      }

      return {
        accessToken: await this.helper.signToken({ uid: user.uid }),
      };
    } catch (err) {
      throw err;
    }
  }
}
