import { Module } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoResolver } from './produto.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoRepository } from './produto.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProdutoRepository])],
  providers: [ProdutoService, ProdutoResolver]
})
export class ProdutoModule { }
