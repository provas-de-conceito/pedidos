import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class PedidoInput {
  @Field()
  data: Date;

  @Field()
  cliente_id: number;
}