import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  public customerName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  public customerEmail: string;

  @ApiProperty()
  @IsNotEmpty()
  public coin: string;

  @ApiProperty()
  @IsNotEmpty()
  public game: string;

  @ApiProperty()
  @IsNotEmpty()
  public price: number;

  @ApiProperty()
  @IsNotEmpty()
  public playerId: string;

  @ApiProperty()
  @IsNotEmpty()
  public transactionId: string;
}
