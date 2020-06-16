import { InputType, Field } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

@InputType()
export class UpdateProdutoInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  nome: String;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  preco: number;
}