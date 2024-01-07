import { Module } from '@nestjs/common';

import { UsersController } from 'src/modules/users/controllers/users.controller';
import { UsersRepository } from 'src/modules/users/repositories/users.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersRepository],
  exports: [],
})
export class UsersModule {}
