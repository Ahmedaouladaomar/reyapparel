import {
  Controller,
  Request,
  Post,
  Get,
  UseGuards,
  Body,
  Req,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { CreateUserDto } from './users/dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req: any) {
    const token = await this.authService.login(req.body);
    // returning token
    return {
      user: req.user,
      token: token,
      success: true,
    };
  }

  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    const res = await this.authService.register(createUserDto);
    if (res.success) {
      // returning token
      return {
        user: res.user,
        token: res.token,
        success: true,
      };
    }
    return;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/auth')
  async auth(@Request() req: any) {
    return req.user;
  }
}
