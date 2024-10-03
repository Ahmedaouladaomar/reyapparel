import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Get('/user/:id')
  findCartByUserId(@Param('id') id: string) {
    return this.cartService.findCartByUserId(+id);
  }

  @Patch('/add')
  addToCart(@Body() body: any) {
    const { user, variant, quantity, price } = body;
    return this.cartService.addToCart(user.id, variant.id, quantity, price);
  }

  @Patch('/remove')
  removeFromCart(@Body() body: any) {
    const { user, variant, price } = body;
    return this.cartService.removeFromCart(user.id, variant.id, price);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
