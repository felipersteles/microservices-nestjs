import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor() {}

  @MessagePattern('get_user')
  getUser(id: number) {
    return {
      message: `User ${id} retrived`,
      user: {
        id: 1,
        name: 'Felipe Teles',
        phone: '9898989898989',
      },
    };
  }
}
