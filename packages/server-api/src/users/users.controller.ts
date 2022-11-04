import {
  Controller,
  Get,
  Session as GetSession,
  UnauthorizedException,
} from '@nestjs/common';
import { UserSession } from 'src/utils/types';

@Controller('v1/users')
export class UsersController {
  @Get('me')
  async me(@GetSession() session: UserSession) {
    if (!session.user) throw new UnauthorizedException();

    return session.user;
  }
}
