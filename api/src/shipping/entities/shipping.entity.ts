import { Order } from 'src/orders/entities/order.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity('shipping')
export class Shipping {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  country: string;
  
  @Column()
  city: string;

  @Column()
  line1: string;

  @Column()
  line2: string;

  @Column()
  postalCode: string;

  @OneToOne(() => Order, (order) => order.shipping)
  @JoinColumn()
  order: Order;
}