import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

@InputType()
export class CreateClienteInput {
  @Field()
  @IsString()
  @MinLength(3)
  @MaxLength(60)
  @IsNotEmpty()
  nome: string;
}