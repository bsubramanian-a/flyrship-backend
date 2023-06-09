import { Module } from '@nestjs/common';
import { UserModule } from 'src/users/user.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { LocalStrategy } from './local-strategy';
import { USER_REPOSITORY } from 'src/core/constants';
import { User } from 'src/users/user.entity';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_CONTSTANT,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, UsersService, LocalStrategy,
    {
      provide: USER_REPOSITORY,
      useValue: User, // The repository entity
    }
  ],
  controllers: [AuthController],
})
export class AuthModule {}
