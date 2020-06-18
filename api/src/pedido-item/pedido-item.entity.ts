import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Pedido } from 'src/pedido/pedido.entity';
import { Produto } from 'src/produto/produto.entity';
// struct db
@ObjectType()
@Entity({ schema: "sc3" })
export class PedidoItem {
  @Field(type => Pedido, { name: "pedido" })
  @Column({ name: "pedido_id", type: "integer", primary: true })
  @ManyToOne(type => Pedido, p => p.items)
  @JoinColumn({ name: "pedido_id" })
  pedido: Pedido;

  @Field(type => Produto, { name: "produto" })
  @Column({ name: "produto_id", type: "integer", primary: true })
  @ManyToOne(type => Produto, p => p.pedidos)
  @JoinColumn({ name: "produto_id" })
  produto: Produto;

  @Field()
  @Column()
  qtd: number;
}