import { IsArray, IsNotEmpty, IsObject, IsString } from 'class-validator';

export class AddOrderDTO {
  @IsNotEmpty()
  @IsObject()
  buyer: { name: string; cpf: string };

  @IsNotEmpty()
  @IsArray()
  items: Array<{ name: string; quantity: number; price: number }>;

  @IsNotEmpty()
  @IsString()
  status: 'pendente' | 'na entrega' | 'faturado' | 'entregue' | 'cancelado';
}
