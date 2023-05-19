import { Injectable, Inject } from '@nestjs/common';
import { Repository, FindOneOptions } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { USER_REPOSITORY } from '../core/constants/index';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async getUser(email: string): Promise<User> {
    const query: FindOneOptions<User> = { where: { email } };
    return this.userRepository.findOne(query);
  }
}
