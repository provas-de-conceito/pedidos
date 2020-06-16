import { ObjectType, ID, Field } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToOne, RelationId, JoinColumn } from 'typeorm';
import { Cliente } from 'src/cliente/cliente.entity';

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
  
  @Field({name: "cliente"})
  @Column({ name: "cliente_id", type: "integer"})
  @ManyToOne(type => Cliente, c => c.pedidos)
  @JoinColumn({name:"cliente_id"})
  cliente: Cliente;
}