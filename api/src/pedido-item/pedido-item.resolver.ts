import { Resolver, Mutation, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { PedidoItemService } from './pedido-item.service';
import { PedidoItem } from './pedido-item.entity';
import { PedidoItemInput } from './input/pedido-item.input';
import { Pedido } from 'src/pedido/pedido.entity';
import { ProdutoService } from 'src/produto/produto.service';
import { PedidoService } from 'src/pedido/pedido.service';
import { Produto } from 'src/produto/produto.entity';

@Resolver(() => PedidoItem)
export class PedidoItemResolver {
    constructor(
        private pedidoItemService: PedidoItemService,
        private produtoService: ProdutoService,
        private pedidoService: PedidoService,
    ) { }

    @ResolveField(() => Pedido)
    async pedido(@Parent() pedidoItem: PedidoItem): Promise<Pedido> {
        return this.pedidoService.findById(pedidoItem.pedido_id)
    }

    @ResolveField(() => Pedido)
    async produto(@Parent() pedidoItem: PedidoItem): Promise<Produto> {
        return this.produtoService.findById(pedidoItem.produto_id)
    }

    @Mutation(() => PedidoItem)
    async createPedidoItem(@Args('data') data: PedidoItemInput): Promise<PedidoItem> {
        return this.pedidoItemService.createAndSave(data);
    }

    @Query(() => [PedidoItem])
    async allPedidoItems(): Promise<PedidoItem[]> {
        return this.pedidoItemService.findAll();
    }

    @Query(() => PedidoItem)
    async pedidoItem(@Args('pedido_id') pedido_id: number, @Args('produto_id') produto_id: number): Promise<PedidoItem> {
        return this.pedidoItemService.findById(pedido_id, produto_id);
    }

    @Mutation(() => PedidoItem)
    async updatePedidoItem(
        @Args('pedido_id') pedido_id: number,
        @Args('produto_id') produto_id: number,
        @Args('data') data?: PedidoItemInput,
    ): Promise<PedidoItem> {
        return this.pedidoItemService.findAndUpdate(pedido_id, produto_id, data);
    }

    @Mutation(() => Boolean)
    async deletePedidoItem(@Args('pedido_id') pedido_id: number, @Args('produto_id') produto_id: number): Promise<boolean> {
        return this.pedidoItemService.delete(pedido_id, produto_id);
    }
}
