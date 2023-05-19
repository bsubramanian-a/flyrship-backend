import { Body, Controller, Post, Param, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from './dto/create-user.dto';
import { BadRequestException } from '@nestjs/common';
import { validateSync } from 'class-validator';
import { CreateUserDtoValidator } from './dto/create-user-dto-validator';
import { plainToClass } from 'class-transformer';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const userDto = plainToClass(CreateUserDtoValidator, createUserDto);
    const errors = validateSync(userDto);

    if (errors.length > 0) {
      const errorMessages = errors.map(error => Object.values(error.constraints)).flat();
      throw new BadRequestException(errorMessages);
    }

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds);

    const existingUser = await this.usersService.getUser(createUserDto.email);
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    if (createUserDto.password !== createUserDto.confirmpassword) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Validation failed',
        errors: [
          {
            field: 'confirmpassword',
            message: 'Confirm password does not match',
          },
        ],
      });
    }

    const result = await this.usersService.createUser({
      ...createUserDto,
      password: hashedPassword,
    });

    return result;
  }
}
