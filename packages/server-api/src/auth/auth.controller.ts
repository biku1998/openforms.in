import {
  Body,
  Controller,
  Post,
  Session as GetSession,
  UnauthorizedException,
} from '@nestjs/common';

import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UserSession } from 'src/utils/types';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('local/register')
  async register(
    @GetSession() session: UserSession,
    @Body() dto: CreateUserDto,
  ) {
    const user = await this.authService.register(dto);

    session.user = user;

    console.log({ session });
    return 'success';
  }

  @Post('local/login')
  async login(@GetSession() session: UserSession, @Body() dto: LoginUserDto) {
    const user = await this.authService.login(dto);

    if (!user) throw new UnauthorizedException();

    session.user = user;

    return 'success';
  }

  // @Post('local/logout')
  // async logout(@GetSession() session: UserSession) {

  // }
}
