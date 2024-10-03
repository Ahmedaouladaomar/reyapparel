import { Controller, Get, Body, Patch, Param, Query, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/users/entities/user-role.enum';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async findAll(
    @Query('rpp') rpp: string,
    @Query('p') p: string,
    @Query('search') search: string,
    @Query('sort') sort: string,
  ) {
    return this.ordersService.findAllWithCount(+rpp, +p, search, sort);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Patch('/status/:id')
  update(@Param('id') id: string, @Body() body: any) {
    const { status, user } = body;
    return this.ordersService.updateStatus(+id, user, status);
  }
}
