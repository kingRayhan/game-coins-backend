import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';

enum OrderStatus {
  PENDING,
  DONE,
}
export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  public static?: OrderStatus;
}
