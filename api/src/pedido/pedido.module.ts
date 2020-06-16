import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoResolver } from './pedido.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoRepository } from './pedido.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PedidoRepository])],
  providers: [PedidoService, PedidoResolver]
})
export class PedidoModule { }
