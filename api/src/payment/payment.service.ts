import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Like, Repository } from 'typeorm';
import { getDateNow } from 'src/helpers';
import { OrdersService } from 'src/orders/orders.service';
import Stripe from 'stripe';
import { CartService } from 'src/cart/cart.service';
import { Order } from 'src/orders/entities/order.entity';
import { UsersService } from 'src/users/users.service';
import { ShippingService } from 'src/shipping/shipping.service';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    private usersService: UsersService,
    private cartService: CartService,
    private ordersService: OrdersService,
    private shippingService: ShippingService,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20',
    });
  }

  create(order: Order, amount: number) {
    // New payment instance
    let payment = new Payment();
    // Total paid amount
    payment.amount = amount;
    // Related order
    payment.order = order;
    // Date of creation
    payment.createdAt = getDateNow();
    // Save to db
    return this.paymentRepository.save(payment);
  }

  async checkout(cart: any, user: any, address: any) {
    try {
      // retrieve user
      let orderUser = await this.usersService.findOne(user.id);
      // retrieve cart
      let orderCart = await this.cartService.findOne(cart.id);
      if (!orderCart || !orderUser) return;
      // create order
      let order = await this.ordersService.create(orderCart, orderUser);
      // Else
      let { totalPrice } = orderCart;
      // Create payment
      await this.create(order, totalPrice);
      // Create shipping
      await this.shippingService.create({ orderId: order.id, ...address });
      // Payment options
      const options = {
        amount: totalPrice * 100,
        currency: 'usd',
        payment_method_types: ['card'],
      };
      // Stripe payment intent
      return this.stripe.paymentIntents.create(options);
    } catch (error) {
      // in case of error
      // Return null
      return
    }
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
    const elements = await this.paymentRepository.find(param);
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

    return this.paymentRepository.find(param);
  }

  async findAllWithCount(rpp: number, p: number, search: string, sort: string) {
    // Payments rows
    const rows = await this.findAll(+rpp, +p, search, sort);
    // Payments count
    const count = await this.countAll(search);
    return {
      rows: rows,
      count: count,
    };
  }

  findOne(id: number) {
    return this.paymentRepository.findOneBy({ id: id });
  }

  remove(id: number) {
    return this.paymentRepository.delete(id);
  }
}
