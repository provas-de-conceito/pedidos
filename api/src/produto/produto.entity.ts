import { ObjectType, ID, Field } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, Double } from 'typeorm';

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

}