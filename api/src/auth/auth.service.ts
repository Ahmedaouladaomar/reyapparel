import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const res = await this.validateUser(user.username, user.password);
    if (!res) return null;
    const payload = { user: res };
    return this.jwtService.sign(payload);
  }

  async register(createUserDto: CreateUserDto) {
    const { email, username } = createUserDto;
    let user: User, found: any;
    try {
      // checking if user with this email already exists or not
      found = await this.usersService.findOneByUsernameOrEmail(email, username);
      if (found) throw new UnauthorizedException();
      user = await this.usersService.create(createUserDto);
    } catch (err) {
      return { error: 'Something went wrong, try again' };
    }
    let token = await this.login(user);
    return {
      user: user,
      token: token,
      success: 'You are now logged in',
    };
  }

  async signup(username: any) {
    const user = await this.usersService.findOneByUsername(username);
    const payload = { user: user };
    return this.jwtService.sign(payload);
  }

  validate(token: string) {
    let cred = null;
    try {
      cred = this.jwtService.verify(token);
    } catch (err) {
      return null;
    }
    return cred;
  }
}
