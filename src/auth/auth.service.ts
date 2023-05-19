import { Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private jwtService: JwtService) { }
    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.getUser(username);
        if (!user) return null;
        const passwordValid = await bcrypt.compare(password, user.password)
        if (!user) {
            throw new NotAcceptableException('could not find the user');
        }
        if (user && passwordValid) {
            return user;
        }
        return null;
    }
    async login(cuser:any) {
        // console.log("cuser", cuser);
        const {username, password} = cuser;
        // const user = await this.validateUser(username, password);
        // if (!user) {
        //   throw new UnauthorizedException('Invalid credentials');
        // }
      
        const payload = { username: username };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }      
}