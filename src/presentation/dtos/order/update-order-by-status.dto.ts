import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateOrderByStatusDTO {
  @IsNotEmpty()
  @IsString()
  status: 'pendente' | 'na entrega' | 'faturado' | 'entregue' | 'cancelado';
}
