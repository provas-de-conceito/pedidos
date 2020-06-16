import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteResolver } from './cliente.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteRepository } from './cliente.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ClienteRepository])],
  providers: [ClienteService, ClienteResolver]
})
export class ClienteModule { }
