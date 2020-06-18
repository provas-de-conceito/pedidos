import { ObjectType, ID, Field } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { PedidoItem } from 'src/pedido-item/pedido-item.entity';

@ObjectType()
@Entity({ schema: "sc2" })
export class Produto {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  nome: string;

  @Field()
  @Column()
  preco: number;

  @Field(() => [PedidoItem])
  pedidos: Array<PedidoItem>;
}