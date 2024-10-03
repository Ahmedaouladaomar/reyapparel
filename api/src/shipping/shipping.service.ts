import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shipping } from './entities/shipping.entity';
import { Like, Repository } from 'typeorm';
import { OrdersService } from 'src/orders/orders.service';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';

@Injectable()
export class ShippingService {
  constructor(
    @InjectRepository(Shipping)
    private shippingRepository: Repository<Shipping>,
    private ordersService: OrdersService,
  ) {}

  async create(createShippingDto: CreateShippingDto) {
    const { orderId, country, city, line1, line2, postal_code } =
      createShippingDto;
    // retrieve order related to payment
    const order = await this.ordersService.findOne(+orderId);
    if (!order) return;
    // new payment instance
    const shipping = new Shipping();
    shipping.country = country;
    shipping.city = city;
    shipping.line1 = line1;
    shipping.line2 = line2;
    shipping.postalCode = postal_code;
    shipping.order = order;
    // Save to db
    return this.shippingRepository.save(shipping);
  }

  async countAll(search: string) {
    const param = {
      where: search
        ? [
            { order: { user: { username: Like(`%${search}%`) } } },
            { order: { user: { email: Like(`%${search}%`) } } },
            { order: { user: { firstName: Like(`%${search}%`) } } },
            { order: { user: { lastName: Like(`%${search}%`) } } },
          ]
        : [],
    };
    const elements = await this.shippingRepository.find(param);
    return elements.length;
  }

  findAll(rpp: number, p: number, search: string, sort: string) {
    let param = {};

    if (rpp && p) {
      let order = {};
      order[`${sort}`] = 'ASC';
      // find options
      param = {
        where: search
          ? [
              { order: { user: { username: Like(`%${search}%`) } } },
              { order: { user: { email: Like(`%${search}%`) } } },
              { order: { user: { firstName: Like(`%${search}%`) } } },
              { order: { user: { lastName: Like(`%${search}%`) } } },
            ]
          : [],
        take: rpp,
        skip: (p - 1) * rpp,
        order: sort ? order : {},
        relations: {
          order: {
            user: true,
          },
        },
      };
    }

    return this.shippingRepository.find(param);
  }

  async findAllWithCount(rpp: number, p: number, search: string, sort: string) {
    // Get rows
    const rows = await this.findAll(rpp, p, search, sort);
    // Get rows count
    const count = await this.countAll(search);
    // Return
    return {
      rows: rows,
      count: count,
    };
  }

  findOne(id: number) {
    return this.shippingRepository.findOneBy({ id: id });
  }

  update(id: number, updateShippingDto: UpdateShippingDto) {
    return this.shippingRepository.update({ id: id }, { ...updateShippingDto });
  }

  remove(id: number) {
    return this.shippingRepository.delete(id);
  }
}
