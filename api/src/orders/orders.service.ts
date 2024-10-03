import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Like, Repository } from 'typeorm';
import { getDateNow } from 'src/helpers';
import { ProductsService } from 'src/products/products.service';
import { OrderStatus } from './entities/order-status.enum';
import { Cart } from 'src/cart/entities/cart.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { CartService } from 'src/cart/cart.service';
import { MailService } from 'src/mail/mail.service';
import { ORDER_STATUS, PAYMENT_RECEIPT } from 'src/consts';
import generateMailHtml from 'src/mail/template';
import { User } from 'src/users/entities/user.entity';
import generateStatusMailHtml from 'src/mail/template-status';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private productsService: ProductsService,
    private cartService: CartService,
    private mailService: MailService,
  ) {}

  async create(cart: Cart, user: User) {
    // Cart or user does not exist
    if (!user || !cart) return;
    try {
      // New order instance
      let order = new Order();
      order.createdAt = getDateNow();
      order.cart = cart;
      order.user = user;
      order.totalPrice = cart.totalPrice;
      // Check stock quantity of each variant
      for (let item of cart.items) {
        let { quantity } = item;
        let { inStock } = item.variant;
        // Unavailable quantity
        if (quantity > inStock) return;
      }
      // Updating cart variants stock after purchase
      for (let item of cart.items) {
        let { id } = item.variant;
        // Purchased quantity
        let { quantity } = item;
        // Stock quantity
        let { inStock } = item.variant;
        // New quantity
        let newStock = inStock - quantity;
        await this.productsService.updateVariantStock(id, newStock);
      }

      // Removing cart from db
      await this.cartService.remove(cart.id);
      // By default status
      order.status = OrderStatus.AWAITING_FULFILLMENT;
      // Sending email
      await this.mailService.sendMail(
        user.email,
        PAYMENT_RECEIPT,
        generateMailHtml(cart, user),
      );
      // Save the new order in the database
      return this.ordersRepository.save(order);
      // in case of error
    } catch (error) {
      // null
      return;
    }
  }

  async countAll(search: string) {
    const param = {
      where: search
        ? [
            { user: { username: Like(`%${search}%`) } },
            { user: { email: Like(`%${search}%`) } },
            { user: { firstName: Like(`%${search}%`) } },
            { user: { lastName: Like(`%${search}%`) } },
          ]
        : [],
    };
    const elements = await this.ordersRepository.find(param);
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
              { user: { username: Like(`%${search}%`) } },
              { user: { email: Like(`%${search}%`) } },
              { user: { firstName: Like(`%${search}%`) } },
              { user: { lastName: Like(`%${search}%`) } },
            ]
          : [],
        take: rpp,
        skip: (p - 1) * rpp,
        order: sort ? order : {},
        relations: {
          user: true,
        },
      };
    }

    return this.ordersRepository.find(param);
  }

  async findAllWithCount(rpp: number, p: number, search: string, sort: string) {
    // Orders rows
    const rows = await this.findAll(+rpp, +p, search, sort);
    // Orders count
    const count = await this.countAll(search);
    return {
      rows: rows,
      count: count,
    };
  }

  findOne(id: number) {
    return this.ordersRepository.findOneBy({
      id: id,
    });
  }

  findOneByUserId(id: number) {
    return this.ordersRepository.findOneBy({
      id: id,
    });
  }

  updatePayment(id: number, payment: Payment) {
    return this.ordersRepository.update({ id: id }, { payment: payment });
  }

  async updateStatus(id: number, user: any, status: OrderStatus) {
    try {
      await this.ordersRepository.update({ id: id }, { status: status });
      // Sending email
      await this.mailService.sendMail(
        user.email,
        ORDER_STATUS,
        generateStatusMailHtml(user, status),
      );
      return {
        success: 'Order updated successfully',
      };
      // in case of error
    } catch (error) {
      // return error message
      return {
        error: `${error.detail}`,
      };
    }
  }

  removePayment(id: number, payment: Payment) {
    return this.ordersRepository.update({ id: id }, { payment: payment });
  }
}
