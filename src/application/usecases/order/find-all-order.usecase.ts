import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../../../infra/db/repositories/order/order-repository';
import { OrderModel } from '../../../infra/db/models/order/order.model';

@Injectable()
export class FindAllOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(): Promise<OrderModel[]> {
    return await this.orderRepository.findAll();
  }
}
