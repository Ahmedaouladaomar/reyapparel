import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
  OneToOne,
} from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { OrderStatus } from './order-status.enum';
import { User } from 'src/users/entities/user.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { Shipping } from 'src/shipping/entities/shipping.entity';
import { Cart } from 'src/cart/entities/cart.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  totalPrice: number;

  @Column()
  status: OrderStatus;

  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @Column('json')
  cart: any;

  @OneToOne(() => Payment, (payment) => payment.order, {
    onDelete: 'CASCADE',
  })
  payment: Payment;

  @OneToOne(() => Shipping, (shipping) => shipping.order, {
    onDelete: 'CASCADE',
  })
  shipping: Shipping;
}
