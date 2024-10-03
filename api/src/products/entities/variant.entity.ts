import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, CreateDateColumn } from 'typeorm';
import { Collection } from 'src/collections/entities/collection.entity';
import { Order } from 'src/orders/entities/order.entity';
import { JSONValue } from 'postgres';
import { Cart } from 'src/cart/entities/cart.entity';
import { Product } from './product.entity';

@Entity('variants')
export class Variant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  inStock: number;

  @Column()
  option: string;

  @Column()
  value: string;
  
  @ManyToOne(() => Product, (product) => product.variants)
  product: Product
}