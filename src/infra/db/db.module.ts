import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModel } from './models/order/order.model';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: 'admin',
      password: 'admin',
      host: 'localhost',
      port: 5432,
      synchronize: true,
      entities: [OrderModel],
      database: 'mevo',
    }),
  ],
})
export class DbModule {}
