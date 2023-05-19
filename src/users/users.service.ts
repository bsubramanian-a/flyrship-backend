import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { USER_REPOSITORY } from 'src/core/constants';
import { Op } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: typeof User,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;

    const username = await this.generateUniqueUsername(email);
    const user = await this.userRepository.create({ ...createUserDto, username });
    return user;
  }
  
  async generateUniqueUsername(email: string): Promise<string> {
    let username = this.extractUsernameFromEmail(email);
    let counter = 1;
  
    while (true) {
      const existingUser = await this.userRepository.findOne({ where: {username} });
  
      if (!existingUser) {
        return username;
      }
  
      username = `${username}${counter}`;
      counter++;
    }
  }
  
  extractUsernameFromEmail(email: string): string {
    // Extract the username from the email. You can implement your own logic here.
    // For example, if the email is "example@example.com", the username would be "example".
    // You can use regular expressions or string manipulation to extract the username.
    // Make sure to handle different email formats appropriately.
    return email.split('@')[0];
  }  

  async getUser(usernameOrEmail: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
      }
    });
    return user;
  }
}
