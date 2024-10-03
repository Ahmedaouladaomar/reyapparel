import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Collection } from 'src/collections/entities/collection.entity';
import { Order } from 'src/orders/entities/order.entity';
import { JSONValue } from 'postgres';
import { Cart } from 'src/cart/entities/cart.entity';
import { Variant } from './variant.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column()
  imageURL: string;

  @Column('varchar', { array: true })
  imagesURL: string[];

  @Column()
  description: string;

  @Column({ type: 'timestamptz' })
  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Variant, (variant) => variant.product, {
    onDelete: 'CASCADE',
  })
  variants: Variant[];

  @ManyToOne(() => Collection, (collection) => collection.items)
  collection: Collection;
}
