import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class PedidoItemInput {
  @Field()
  pedido_id: number;

  @Field()
  produto_id: number;

  @Field()
  qtd: number;
}
