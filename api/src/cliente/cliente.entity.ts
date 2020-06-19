import { ObjectType, ID, Field, HideField } from '@nestjs/graphql';
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

  @Field()
  @Column()
  email: string;

  @HideField()
  @Column()
  senha: string;

  @Field(() => [Pedido])
  pedidos: Array<Pedido>;
}