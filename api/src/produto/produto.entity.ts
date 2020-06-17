import { ObjectType, ID, Field } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { PedidoItem } from 'src/pedido-item/pedido-item.entity';

@ObjectType()
@Entity({ schema: "sc2" })
export class Produto {
  @Field(type => ID)
  @PrimaryColumn()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  nome: String;

  @Field()
  @Column()
  preco: number;
  // preciso de um tipo para moeda...

  @Field(type => [PedidoItem])
  @OneToMany(()=>PedidoItem, (item)=>item.produto)
  pedidos: Array<PedidoItem>;
}