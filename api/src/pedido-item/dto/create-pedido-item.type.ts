import { InputType, Field } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

@InputType()
export class CreatePedidoItemInput {
  @Field()
  @IsNumber()
  @IsNotEmpty()
  pedido_id: number;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  produto_id: number;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  qtd: number;
}