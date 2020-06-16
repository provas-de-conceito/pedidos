import { InputType, Field } from '@nestjs/graphql';
import {
  IsNotEmpty, MaxLength, IsString, MinLength
} from 'class-validator';

@InputType()
export class UpdateClienteInput {
  @Field()
  @IsString()
  @MinLength(3)
  @MaxLength(60)
  @IsNotEmpty()
  nome: string;
}