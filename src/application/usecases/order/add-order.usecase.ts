import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { OrderRepository } from '../../../infra/db/repositories/order/order-repository';
import { AddOrderDTO } from '../../../presentation/dtos/order/add-order.dto';
import { OrderModel } from '../../../infra/db/models/order/order.model';
import { Order } from '../../../domain/order/order';

@Injectable()
export class AddOrderUseCase {
  private logger = new Logger(AddOrderUseCase.name);

  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(data: AddOrderDTO): Promise<OrderModel> {
    try {
      const order = Order.create(data);
      const orderCreate = await this.orderRepository.create(order);
      return orderCreate;
    } catch (error) {
      this.logger.error(error);

      throw new BadRequestException('Error in create order');
    }
  }
}
