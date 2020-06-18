import { ObjectType, ID, Field } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Cliente } from 'src/cliente/cliente.entity';
import { PedidoItem } from 'src/pedido-item/pedido-item.entity';

@ObjectType()
@Entity({ schema: "sc3" })
export class Pedido {
  @Field(() => ID)
  @PrimaryColumn()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  data: Date;

  @Field(type => Cliente, { name: "cliente" })
  @Column({ name: "cliente_id", type: "integer" })
  @ManyToOne(type => Cliente, c => c.pedidos)
  @JoinColumn({ name: "cliente_id" })
  cliente: Cliente;

  @Field(type => [PedidoItem])
  @OneToMany(() => PedidoItem, (item) => item.pedido)
  items: Array<PedidoItem>;
}