import { Module, forwardRef } from '@nestjs/common';
import { PedidoItemService } from './pedido-item.service';
import { PedidoItemResolver } from './pedido-item.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoItemRepository } from './pedido-item.repository';
import { PedidoModule } from 'src/pedido/pedido.module';
import { ProdutoModule } from 'src/produto/produto.module';
import { PedidoItemLoaderByPedidoID, PedidoItemLoaderByProdutoID } from './pedido-item.dataloader';
import { DataLoaderInterceptor } from 'nestjs-dataloader';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([PedidoItemRepository]),
    forwardRef(() => PedidoModule),
    forwardRef(() => ProdutoModule),    
  ],
  providers: [
    PedidoItemService,
    PedidoItemResolver,
    PedidoItemLoaderByPedidoID,
    PedidoItemLoaderByProdutoID,
    { useClass: DataLoaderInterceptor, provide: APP_INTERCEPTOR }
  ],
  exports: [PedidoItemService]
})
export class PedidoItemModule { }
