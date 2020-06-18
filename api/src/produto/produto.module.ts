import { Module, forwardRef } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoResolver } from './produto.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoRepository } from './produto.repository';
import { PedidoItemModule } from 'src/pedido-item/pedido-item.module';
import { ProdutoLoaderByID } from './produto.dataloader';
import { DataLoaderInterceptor } from 'nestjs-dataloader';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProdutoRepository]),
    forwardRef(() => PedidoItemModule)
  ],
  providers: [
    ProdutoService, 
    ProdutoResolver,
    ProdutoLoaderByID,
    { useClass: DataLoaderInterceptor, provide: APP_INTERCEPTOR }
  ],
  exports: [ProdutoService]
})
export class ProdutoModule { }
