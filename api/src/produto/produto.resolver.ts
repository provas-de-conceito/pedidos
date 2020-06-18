import { Resolver, Mutation, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { ProdutoService } from './produto.service';
import { Produto } from './produto.entity';
import { ProdutoInput } from './input/produto.input';
import { PedidoItem } from 'src/pedido-item/pedido-item.entity';
import { PedidoItemService } from 'src/pedido-item/pedido-item.service';

@Resolver(() => Produto)
export class ProdutoResolver {
    constructor(
        private produtoService: ProdutoService,
        private pedidoItemService: PedidoItemService,
    ) { }

    @ResolveField(() => [PedidoItem])
    async pedidos(@Parent() produto: Produto): Promise<PedidoItem[]> {
        return this.pedidoItemService.findByProdutoId([produto.id]);
    }

    @Mutation(() => Produto)
    async createProduto(@Args('data') data: ProdutoInput): Promise<Produto> {
        return this.produtoService.createAndSave(data);
    }

    @Query(() => [Produto])
    async allProdutos(): Promise<Produto[]> {
        return this.produtoService.findAll();
    }

    @Query(() => Produto)
    async produto(@Args('id') id: number): Promise<Produto> {
        return this.produtoService.findById(id);
    }

    @Mutation(() => Produto)
    async updateProduto(
        @Args('id') id: number,
        @Args('data') data?: ProdutoInput,
    ): Promise<Produto> {
        return this.produtoService.findAndUpdate(id, data);
    }

    @Mutation(() => Boolean)
    async deleteProduto(@Args('id') id: number): Promise<boolean> {
        return this.produtoService.delete(id);
    }
}
