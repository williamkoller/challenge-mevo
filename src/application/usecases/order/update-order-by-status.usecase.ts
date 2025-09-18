import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { OrderRepository } from '../../../infra/db/repositories/order/order-repository';
import { IdentifyOrderIdDTO } from '../../../presentation/dtos/order/identify-order-id.dto';
import { UpdateOrderByStatusDTO } from '../../../presentation/dtos/order/update-order-by-status.dto';
import { RequestMotoboyIntegration } from '../../../infra/http/integration/request-motoboy-integration';

@Injectable()
export class UpdateOrderByStatusUseCase {
  private logger = new Logger(UpdateOrderByStatusUseCase.name);
  private notFoundException: NotFoundException = new NotFoundException(
    'Order not found',
  );
  private httpException: HttpException = new HttpException(
    'FAILED_DEPENDENCY',
    424,
  );
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly requestMotoboyIntegration: RequestMotoboyIntegration,
  ) {}

  async execute(
    identifyOrderIdDTO: IdentifyOrderIdDTO,
    data: UpdateOrderByStatusDTO,
  ): Promise<void | string> {
    try {
      const orderExists = await this.orderRepository.findById(
        identifyOrderIdDTO.id,
      );

      if (!orderExists) {
        throw this.notFoundException;
      }

      const updateOrderStatus = {
        ...orderExists,
        status: data.status,
      };

      const callExternal = await this.requestMotoboyIntegration.requestMotoboy(
        String(orderExists.id),
      );

      const blocked = 'Order stuck/blocked';

      const statusType = {
        faturado: callExternal,
        entregue: blocked,
      };

      console.log(statusType);

      if (statusType.entregue) {
        return blocked;
      }

      updateOrderStatus.status = statusType[data.status];

      if (!callExternal) {
        throw this.httpException;
      }

      await this.orderRepository.update(orderExists.id, updateOrderStatus);
    } catch (error) {
      this.logger.error(error);

      if (error instanceof ConflictException) {
        throw this.notFoundException;
      }

      if (error instanceof HttpException) {
        throw this.httpException;
      }

      throw new BadRequestException('Error in update status order');
    }
  }
}
