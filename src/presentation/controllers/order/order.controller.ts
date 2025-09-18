import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AddOrderUseCase } from '../../../application/usecases/order/add-order.usecase';
import { AddOrderDTO } from '../../dtos/order/add-order.dto';
import { OrderModel } from '../../../infra/db/models/order/order.model';
import { FindAllOrderUseCase } from '../../../application/usecases/order/find-all-order.usecase';
import { UpdateOrderByStatusUseCase } from '../../../application/usecases/order/update-order-by-status.usecase';
import { IdentifyOrderIdDTO } from '../../dtos/order/identify-order-id.dto';
import { UpdateOrderByStatusDTO } from '../../dtos/order/update-order-by-status.dto';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly addOrderUseCase: AddOrderUseCase,
    private readonly findAllOrdersUseCase: FindAllOrderUseCase,
    private readonly updateOrderByStatusUseCase: UpdateOrderByStatusUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: AddOrderDTO): Promise<OrderModel> {
    return await this.addOrderUseCase.execute(data);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async find(): Promise<OrderModel[]> {
    return await this.findAllOrdersUseCase.execute();
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updatestatus(
    @Param() identifyOrderIdDTO: IdentifyOrderIdDTO,
    @Body() data: UpdateOrderByStatusDTO,
  ): Promise<unknown> {
    return this.updateOrderByStatusUseCase.execute(identifyOrderIdDTO, data);
  }
}
