import { Injectable } from '@nestjs/common';
import { User } from 'shared-ts';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { matchPassword } from 'src/utils/password';
import { LoginUserDto } from './dtos/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async register(dto: CreateUserDto): Promise<User> {
    const user = await this.userService.create(dto);
    return user;
  }

  async login(dto: LoginUserDto): Promise<User | null> {
    const user = await this.userService.findByEmail(dto.email);

    if (!user) return null;

    if (
      await matchPassword({
        hashedPassword: user.password,
        plainPassword: dto.password,
      })
    )
      return user;
  }
}
