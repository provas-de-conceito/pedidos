import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { PedidoService } from './pedido.service';
import { Pedido } from './pedido.entity';
import { PedidoInput } from './input/pedido.input';

@Resolver('Pedido')
export class PedidoResolver {
    constructor(private PedidoService: PedidoService) { }

    @Mutation(returns => Pedido)
    async createPedido(@Args('data') data: PedidoInput): Promise<Pedido> {
        return this.PedidoService.createAndSave(data);
    }

    @Query(returns => [Pedido])
    async allPedidos(): Promise<Pedido[]> {
        return this.PedidoService.findAll();
    }

    @Query(returns => Pedido)
    async pedido(@Args('id') id: number): Promise<Pedido> {
        return this.PedidoService.findById(id);
    }

    @Mutation(returns => Pedido)
    async updatePedido(
        @Args('id') id: number,
        @Args('data') data?: PedidoInput,
    ): Promise<Pedido> {
        return this.PedidoService.findAndUpdate(id, data);
    }

    @Mutation(returns => Boolean)
    async deletePedido(@Args('id') id: number): Promise<boolean> {
        return this.PedidoService.delete(id);
    }
}
