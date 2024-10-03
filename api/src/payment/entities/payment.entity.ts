import { Order } from 'src/orders/entities/order.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity('payment')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ 'type': 'varchar' })
  amount: any;

  @Column({ 'type': 'timestamptz' })
  createdAt: Date;

  @OneToOne(() => Order, (order) => order.payment)
  @JoinColumn()
  order: Order;
}