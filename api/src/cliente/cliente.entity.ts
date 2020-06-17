import { ObjectType, ID, Field } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Pedido } from 'src/pedido/pedido.entity';

@ObjectType()
@Entity({ schema: "sc2" })
export class Cliente {
  @Field(type => ID)
  @PrimaryColumn()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  nome: string;

  @Field(type=> [Pedido])
  @OneToMany(()=>Pedido, (pedido)=>pedido.cliente)
  pedidos: Array<Pedido>;
}