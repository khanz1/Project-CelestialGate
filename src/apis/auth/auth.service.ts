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
import { ConfigService } from '@nestjs/config';
import { UniqueConstraintError, ValidationError } from 'sequelize';
import { SignInDto } from './dto/sign-in.dto';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { OAuth } from './models/oauth.model';
import { OAUTH_PROVIDER } from './auth.types';
import { nanoid } from 'nanoid';
import { AuthHelper } from '@/utils/auth.helper';
import { Helper } from '@/utils/helper';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(OAuth) private readonly oauthModel: typeof OAuth,
    private helper: AuthHelper,
    private readonly httpService: HttpService,
  ) {}
  async signUp(data: SignUpDto) {
    const newUser: Partial<User> = data;
    newUser.password = await this.helper.hashPassword(data.password);

    try {
      newUser.uid = Helper.generateUID();
      const user = await this.userModel.create(newUser);
      console.log(user, '<<< user');

      return {
        accessToken: await this.helper.signToken({ uid: user.uid }),
      };
    } catch (err) {
      console.log(err, '<<< err');
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
    try {
      let user = await this.userModel.findOne({
        where: { email: data.email },
      });

      if (!user) {
        throw new UnauthorizedException({
          message: 'Username/Email or password is wrong',
        });
      }

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

  async signInGoogle(data: any) {
    /*
    {
    access_token: 
      'ya29.a0AfB_byDqAlZuY_8z81L8MBCFRNIs_kJqmzHH-HQL-syH9x8JY_aJo5Ol1sddPi6oKdxi9ILtxr8vUmiiGEb3VEQE0METeRgtPNMacKoaH8MAW4Irf6J0pvbda1MzkIq4DvOao-j_yXDz_zvtThrlTwV6wVmOeQ2S-bkVaCgYKATQSAQ8SFQHGX2MixwVansAzNmn6tdh1pKYDkw0171',
    token_type: 'Bearer',
    expires_in: 3599,
    scope: 
      'email profile openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
    authuser: '1',
    prompt: 'none'
  }
  */

    const response = await firstValueFrom(
      this.httpService
        .get('https://www.googleapis.com/oauth2/v3/userinfo', {
          params: {
            access_token: data.access_token,
          },
        })
        .pipe(
          catchError((error) => {
            this.logger.error(error.response.data);
            throw new InternalServerErrorException(
              `we are experiencing issue, please try again later`,
            );
          }),
        ),
    );

    const oauth = await this.oauthModel.findOne({
      where: {
        provider: OAUTH_PROVIDER.GOOGLE,
        oauthId: response.data.sub,
      },
      include: [this.userModel],
    });

    if (oauth) {
      const accessToken = await this.helper.signToken({ uid: oauth.User.uid });
      return {
        accessToken,
        statusCode: 200,
        message: `Login success`,
      };
    }

    const [user, created] = await this.userModel.findOrCreate({
      where: {
        email: response.data.email,
      },
      defaults: {
        username: response.data.email.split('@')[0],
        email: response.data.email,
        password: this.helper.hashPassword(nanoid(10)),
        pictureUrl: response.data.picture,
        isVerified: true,
        isSubscribed: false,
        status: 'active',
      },
    });

    if (!created) {
      this.logger.log(`User already exist, updating the picture`);
    }

    await this.oauthModel.create({
      provider: OAUTH_PROVIDER.GOOGLE,
      userId: user.id,
      oauthId: response.data.sub,
      name: response.data.name,
      username: response.data.email.split('@')[0],
      email: response.data.email,
      pictureUrl: response.data.picture,
    });

    const accessToken = await this.helper.signToken({ uid: user.uid });
    return {
      accessToken,
      statusCode: 201,
      message: `Login success`,
    };
  }
}
