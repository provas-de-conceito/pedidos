import { Module } from '@nestjs/common';
import { PedidoItemService } from './pedido-item.service';
import { PedidoItemResolver } from './pedido-item.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoItemRepository } from './pedido-item.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PedidoItemRepository])],
  providers: [PedidoItemService, PedidoItemResolver]
})
export class PedidoItemModule { }
