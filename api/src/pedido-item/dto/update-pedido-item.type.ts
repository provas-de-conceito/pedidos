import { InputType, Field } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

@InputType()
export class UpdatePedidoItemInput {
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
