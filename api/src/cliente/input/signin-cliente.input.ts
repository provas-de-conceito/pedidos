import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class SignInClienteInput {
  @Field()
  readonly email: string;

  @Field()
  readonly senha: string
}