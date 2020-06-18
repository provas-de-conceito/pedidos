import { ObjectType, ID, Field, HideField } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Cliente } from 'src/cliente/cliente.entity';
import { PedidoItem } from 'src/pedido-item/pedido-item.entity';

@ObjectType()
@Entity({ schema: "sc3" })
export class Pedido {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  data: Date;

  @Field(() => Cliente, { name: "cliente" })
  cliente: Cliente;

  @HideField()
  @Column({name: "cliente_id", type:"int"})
  cliente_id: number;

  @Field(() => [PedidoItem])
  items: Array<PedidoItem>;
}