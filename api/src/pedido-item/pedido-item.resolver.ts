import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { PedidoItemService } from './pedido-item.service';
import { PedidoItem } from './pedido-item.entity';
import { CreatePedidoItemInput } from './dto/create-pedido-item.type';
import { UpdatePedidoItemInput } from './dto/update-pedido-item.type';

@Resolver('PedidoItem')
export class PedidoItemResolver {
    constructor(private PedidoItemService: PedidoItemService) { }

    @Mutation(returns => PedidoItem)
    async createPedidoItem(@Args('data') data: CreatePedidoItemInput): Promise<PedidoItem> {
        return this.PedidoItemService.createAndSave(data);
    }

    @Query(returns => [PedidoItem])
    async allPedidoItems(): Promise<PedidoItem[]> {
        return this.PedidoItemService.findAll();
    }

    @Query(returns => PedidoItem)
    async pedidoItem(@Args('pedido_id') pedido_id: number, @Args('produto_id') produto_id: number): Promise<PedidoItem> {
        return this.PedidoItemService.findById(pedido_id, produto_id);
    }

    @Mutation(returns => PedidoItem)
    async updatePedidoItem(
        @Args('pedido_id') pedido_id: number,
        @Args('produto_id') produto_id: number,
        @Args('data') data?: UpdatePedidoItemInput,
    ): Promise<PedidoItem> {
        return this.PedidoItemService.findAndUpdate(pedido_id, produto_id, data);
    }

    @Mutation(returns => Boolean)
    async deletePedidoItem(@Args('pedido_id') pedido_id: number, @Args('produto_id') produto_id: number): Promise<boolean> {
        return this.PedidoItemService.delete(pedido_id, produto_id);
    }
}
