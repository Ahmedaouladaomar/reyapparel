import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { CartItem } from './cartItem.entity';

@Entity('cart')
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  totalPrice: number;

  @OneToOne(() => User, (user) => user.cart)
  @JoinColumn()
  user: User;

  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, {
    onDelete: 'CASCADE',
  })
  items: CartItem[];
}
