import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';

export class UpdateOrderDTO {
  @IsOptional()
  @IsObject()
  buyer: { name: string; cpf: string };

  @IsOptional()
  @IsArray()
  items: Array<{ name: string; quantity: number; price: number }>;

  @IsOptional()
  @IsString()
  status: 'pendente' | 'na entrega' | 'faturado' | 'entregue' | 'cancelado';
}
