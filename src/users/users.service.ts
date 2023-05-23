import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { USER_REPOSITORY } from 'src/core/constants';
import { Op } from 'sequelize';
import { hash, compare } from 'bcrypt';

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

  async getUserProfile(userId: string): Promise<User> {
    const user = await this.userRepository.findByPk(userId);
  
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    return user;
  }  

  async updateUser(id: number, updateUserDto: any): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      // Handle user not found error
    }

    const updatedUser = await user.update(updateUserDto);
    return updatedUser;
  }

  async changePassword(id: number, changePasswordDto: any): Promise<any> {
    const { currentPassword, newPassword, confirmPassword } = changePasswordDto;

    // Find the user by ID
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if the current password matches
    const isMatch = await compare(currentPassword, user.password);
    if (!isMatch) {
      return {
        error: 'Current password is incorrect',
      };
    }

    // Check if the new password and confirm password match
    if (newPassword !== confirmPassword) {
      return {
        error: 'New password and confirm password do not match',
      };
    }

    // Hash the new password
    const hashedPassword = await hash(newPassword, 10);

    // Update the user's password
    await user.update({ password: hashedPassword });

    return user;
  }

  async deleteUser(id: string) {
    // Find the user by ID
    const user = await this.userRepository.findByPk(id);
  
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    // Delete the user
    await user.destroy();
  }  
}
