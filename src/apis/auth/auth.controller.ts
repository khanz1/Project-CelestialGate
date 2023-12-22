import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/sign-up')
  signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }

  @Post('/sign-in')
  signIn(@Body() body: SignInDto) {
    return this.authService.signIn(body);
  }

  @Post('/sign-in/google')
  signInGoogle(@Body() body: any) {
    return this.authService.signInGoogle(body);
  }
}
