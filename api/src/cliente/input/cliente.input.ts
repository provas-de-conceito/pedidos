import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ClienteInput {
  @Field()
  nome: string;

  @Field()
  email: string;

  @Field()
  senha: string;
}