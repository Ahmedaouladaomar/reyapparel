import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/users/entities/user-role.enum';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Get()
  async findAll(
    @Query('rpp') rpp: string,
    @Query('p') p: string,
    @Query('search') search: string,
    @Query('sort') sort: string,
  ) {
    return this.paymentService.findAllWithCount(+rpp, +p, search, sort);
  }

  @UseGuards(JwtAuthGuard)
  @Post('checkout')
  checkout(@Body() body: any) {
    const { user, cart, address } = body;
    return this.paymentService.checkout(cart, user, address);
  }
}
