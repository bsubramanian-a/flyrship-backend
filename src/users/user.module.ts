import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './user.controller';
import { User } from './user.entity';
import { usersProviders } from './users.providers';
import { UsersService } from './users.service';
import { USER_REPOSITORY } from 'src/core/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Specify the User entity
  ],
  providers: [ UsersService,
    {
      provide: USER_REPOSITORY,
      useValue: User, // The repository entity
    }, ...usersProviders],
  controllers: [UsersController],
})
export class UserModule {}
