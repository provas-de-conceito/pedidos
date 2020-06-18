import { ObjectType, Field, HideField } from '@nestjs/graphql';
import { Entity, Column } from 'typeorm';
import { Pedido } from 'src/pedido/pedido.entity';
import { Produto } from 'src/produto/produto.entity';
// struct db
@ObjectType()
@Entity({ schema: "sc3" })
export class PedidoItem {  
  @HideField()
  @Column({ name: "pedido_id", type: "integer", primary: true })
  pedido_id: number;  

  @HideField()
  @Column({ name: "produto_id", type: "integer", primary: true })
  produto_id: number;

  @Field()
  @Column()
  qtd: number;

  @Field(() => Pedido, { name: "pedido" })
  pedido: Pedido;

  @Field(() => Produto, { name: "produto" }) 
  produto: Produto;
}