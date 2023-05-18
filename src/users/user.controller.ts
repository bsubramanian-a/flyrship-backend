import { Body, Controller, Post, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { bcrypt } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async createUser(
    @Body() createUserDto: CreateUserDto
  ): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds);
    const result = await this.usersService.createUser({
      ...createUserDto,
      password: hashedPassword,
    });
    return result;  
  }
}
