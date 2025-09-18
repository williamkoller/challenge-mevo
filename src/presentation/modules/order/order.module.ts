import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModel } from '../../../infra/db/models/order/order.model';
import { OrderRepository } from '../../../infra/db/repositories/order/order-repository';
import { AddOrderUseCase } from '../../../application/usecases/order/add-order.usecase';
import { OrderController } from '../../controllers/order/order.controller';
import { FindAllOrderUseCase } from '../../../application/usecases/order/find-all-order.usecase';
import { UpdateOrderByStatusUseCase } from '../../../application/usecases/order/update-order-by-status.usecase';
import { RequestMotoboyIntegration } from '../../../infra/http/integration/request-motoboy-integration';

@Module({
  imports: [TypeOrmModule.forFeature([OrderModel])],
  controllers: [OrderController],
  providers: [
    OrderRepository,
    AddOrderUseCase,
    FindAllOrderUseCase,
    UpdateOrderByStatusUseCase,
    RequestMotoboyIntegration,
  ],
})
export class OrderModule {}
