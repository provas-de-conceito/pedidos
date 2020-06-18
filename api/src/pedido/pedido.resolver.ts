import { Resolver, Mutation, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { PedidoService } from './pedido.service';
import { Pedido } from './pedido.entity';
import { PedidoInput } from './input/pedido.input';
import { Cliente } from 'src/cliente/cliente.entity';
import { ClienteService } from 'src/cliente/cliente.service';
import { PedidoItemService } from 'src/pedido-item/pedido-item.service';
import { PedidoItem } from 'src/pedido-item/pedido-item.entity';

@Resolver(()=> Pedido)
export class PedidoResolver {
    constructor(
        private pedidoService: PedidoService,
        private clienteService: ClienteService,
        private pedidoItemService: PedidoItemService,
        ) { }

    @ResolveField(() => Cliente)
    async cliente(@Parent() pedido: Pedido): Promise<Cliente> {
        return this.clienteService.findById(pedido.cliente_id);
    }

    @ResolveField(() => Cliente)
    async items(@Parent() pedido: Pedido): Promise<PedidoItem[]> {
        return this.pedidoItemService.findByPedidoId([pedido.id]);
    }

    @Mutation(() => Pedido)
    async createPedido(@Args('data') data: PedidoInput): Promise<Pedido> {
        return this.pedidoService.createAndSave(data);
    }

    @Query(() => [Pedido])
    async allPedidos(): Promise<Pedido[]> {
        return this.pedidoService.findAll();
    }

    @Query(() => Pedido)
    async pedido(@Args('id') id: number): Promise<Pedido> {
        return this.pedidoService.findById(id);
    }

    @Mutation(() => Pedido)
    async updatePedido(
        @Args('id') id: number,
        @Args('data') data?: PedidoInput,
    ): Promise<Pedido> {
        return this.pedidoService.findAndUpdate(id, data);
    }

    @Mutation(() => Boolean)
    async deletePedido(@Args('id') id: number): Promise<boolean> {
        return this.pedidoService.delete(id);
    }
}
