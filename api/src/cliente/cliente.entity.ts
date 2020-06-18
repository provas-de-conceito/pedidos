import { ObjectType, ID, Field } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Pedido } from 'src/pedido/pedido.entity';

@ObjectType()
@Entity({ schema: "sc2" })
export class Cliente {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  nome: string;

  @Field(() => [Pedido])
  pedidos: Array<Pedido>;
}