import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderModel } from '../../models/order/order.model';
import { Repository } from 'typeorm';
import { AddOrderDTO } from '../../../../presentation/dtos/order/add-order.dto';
import { UpdateOrderDTO } from '../../../../presentation/dtos/order/update-order.dto';
import { Order } from '../../../../domain/order/order';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(OrderModel)
    private readonly orderModel: Repository<OrderModel>,
  ) {}

  async create(order: Order): Promise<OrderModel> {
    return await this.orderModel.save(order);
  }

  async findAll(): Promise<OrderModel[]> {
    return await this.orderModel.find();
  }

  async findById(id: number): Promise<OrderModel | null> {
    const order = await this.orderModel.findOne({ where: { id } });

    if (!order) {
      return null;
    }

    return order;
  }

  async update(id: number, data: UpdateOrderDTO): Promise<void> {
    await this.orderModel.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.orderModel.delete(id);
  }
}
