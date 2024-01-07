import { Controller, Get } from '@nestjs/common';

import { UsersRepository } from 'src/modules/users/repositories/users.repository';

@Controller('users')
export class UsersController {
  constructor(private readonly usersRepository: UsersRepository) {}

  @Get()
  public async index() {
    return this.usersRepository.findAll();
  }
}
