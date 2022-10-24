import { Injectable } from '@nestjs/common';
import { User } from 'shared-ts';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getUser(): User {
    const user: User = {
      name: 'name here',
      email: 'email@gmail.com',
      created_at: new Date(),
      deleted_at: new Date(),
      is_active: false,
      new: 'added',
    };
    return user;
  }
}
