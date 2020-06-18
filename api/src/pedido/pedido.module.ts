import { Module, forwardRef } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoResolver } from './pedido.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoRepository } from './pedido.repository';
import { ClienteModule } from 'src/cliente/cliente.module';
import { PedidoItemModule } from 'src/pedido-item/pedido-item.module';
import { PedidoLoaderByClientID, PedidoLoaderByID } from './pedido.dataloader';
import { DataLoaderInterceptor } from 'nestjs-dataloader';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([PedidoRepository]),
    forwardRef(() => ClienteModule),
    forwardRef(() => PedidoItemModule)
  ],
  providers: [
    PedidoService, 
    PedidoResolver,
    PedidoLoaderByID,
    PedidoLoaderByClientID,
    { useClass: DataLoaderInterceptor, provide: APP_INTERCEPTOR }
  ],
  exports: [PedidoService]
})
export class PedidoModule { }
