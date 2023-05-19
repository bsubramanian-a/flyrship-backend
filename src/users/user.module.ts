import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';

@Module({
  providers: [UsersService, ...usersProviders],
  controllers: [UsersController],
})
export class UserModule {}