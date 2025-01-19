import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { Helper } from '@/utils/helper';
import ResponseConstant from '@/constants/response.constant';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/sign-up')
  async signUp(@Body() body: SignUpDto) {
    const data = await this.authService.signUp(body);
    return Helper.fResponse(
      data,
      ResponseConstant.CREATED,
      ResponseConstant.SIGN_UP_SUCCESS,
    );
  }

  @Post('/sign-in')
  async signIn(@Body() body: SignInDto) {
    const data = await this.authService.signIn(body);
    return Helper.fResponse(
      data,
      ResponseConstant.OK,
      ResponseConstant.SIGN_IN_SUCCESS,
    );
  }

  @Post('/sign-in/google')
  async signInGoogle(@Body() body: any) {
    const data = await this.authService.signInGoogle(body);
    return Helper.fResponse(
      data,
      ResponseConstant.OK,
      ResponseConstant.SIGN_IN_WITH_GOOGLE_SUCCESS,
    );
  }
}
