import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class IdentifyOrderIdDTO {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  id: number;
}
