import { Module } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { ShippingController } from './shipping.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipping } from './entities/shipping.entity';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Shipping]),
    OrdersModule
  ],
  controllers: [ShippingController],
  providers: [ShippingService],
  exports: [ShippingService]
})
export class ShippingModule {}
