import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CoinDTO {
  @ApiProperty()
  public label: string;

  @ApiProperty()
  public price: number;
}

export class CreateGameDto {
  @ApiProperty()
  @IsNotEmpty()
  public title: string;

  @ApiProperty()
  @IsNotEmpty()
  public body: string;

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => CoinDTO)
  public coins?: CoinDTO[];
}
