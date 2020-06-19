import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Token {
  @Field()
  readonly token: string  
}