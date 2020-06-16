import { ObjectType, ID, Field } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Pedido } from 'src/pedido/pedido.entity';
import { Produto } from 'src/produto/produto.entity';
// struct db
@ObjectType()
@Entity({ schema: "sc3" })
export class PedidoItem {
  @Field()
  // primary key
  @PrimaryColumn()
  // relacion many to one
  @ManyToOne(type => Pedido, p => p.id)
  // foreing key
  @JoinColumn([
    { name: "pedido_id", referencedColumnName: "id" },
  ])
  pedido_id: number;

  @Field()
  @Column()
  @ManyToOne(type => Produto, p => p.id)
  @JoinColumn([
    { name: "produto_id", referencedColumnName: "id" },
  ])
  produto_id: number;

  @Field()
  @Column()
  qtd: number;

}