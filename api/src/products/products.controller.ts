import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/users/entities/user-role.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  async findAll(
    @Query('rpp') rpp: string,
    @Query('p') p: string,
    @Query('search') search: string,
    @Query('sort') sort: string,
  ) {
    return this.productsService.findAllWithCount(+rpp, +p, search, sort);
  }

  @Get('plp')
  async findAllPlp(
    @Query('rpp') rpp: string,
    @Query('p') p: string,
    @Query('price') price: string,
    @Query('collection') collection: string,
  ) {
    return this.productsService.findAllPlpWithCount({
      rpp: +rpp,
      p: +p,
      price,
      collection,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Get('name/:name')
  findOneByName(@Param('name') name: string) {
    return this.productsService.findOneByName(name);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch(':id/collection')
  updateCollection(
    @Param('id') id: string,
    @Body('collectionId') collectionId: string,
  ) {
    return this.productsService.addToCollection(+id, +collectionId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
