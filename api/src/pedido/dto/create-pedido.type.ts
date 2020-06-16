import { InputType, Field } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsDate,
  IsNumber,
} from 'class-validator';

@InputType()
export class CreatePedidoInput {
  @Field()
  @IsDate()
  @IsNotEmpty()
  data: Date;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  cliente_id: number;
}