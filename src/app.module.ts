import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { UsersService } from './users/users.service';
import { usersProviders } from './users/users.providers';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { User } from './users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 5432),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [User], // add your entities here
        synchronize: true, // set to false in production
        ssl: {
          rejectUnauthorized: false, // Set this to true if your PostgreSQL server requires a valid SSL certificate
        },
      }),
    }),
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService, UsersService, AuthService, JwtService, ...usersProviders],
})
export class AppModule {}
