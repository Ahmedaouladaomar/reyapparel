import { Product } from 'src/products/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('collections')
export class Collection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  imageURL: string;

  @Column({ 'type': 'timestamptz' })
  createdAt: Date;

  @OneToMany(() => Product, (product) => product.collection)
  items: Product[]
}