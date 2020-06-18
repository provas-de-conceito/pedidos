import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ProdutoInput {
  @Field()
  nome: string;

  @Field()
  preco: number;
}