import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { UsersService } from './users/users.service';
import { UsersController } from './users/user.controller';
import { usersProviders } from './users/users.providers';
import { DatabaseModule } from './database/database.module';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[DatabaseModule, AuthModule, UserModule],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService, AuthService, JwtService, ...usersProviders],
})
export class AppModule {}
