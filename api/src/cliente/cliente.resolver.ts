import { Resolver, Mutation, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.entity';
import { ClienteInput } from './input/cliente.input';
import { Pedido } from 'src/pedido/pedido.entity';
import { PedidoService } from 'src/pedido/pedido.service';

@Resolver(() => Cliente)
export class ClienteResolver {
    constructor(
        private clienteService: ClienteService,
        private pedidoService: PedidoService
    ) { }

    @ResolveField(() => [Pedido])
    async pedidos(@Parent() cliente: Cliente): Promise<Pedido[]> {
        return this.pedidoService.findByClienteId([cliente.id])
    }

    @Mutation(() => Cliente)
    async createCliente(@Args('data') data: ClienteInput): Promise<Cliente> {
        return this.clienteService.createAndSave(data);
    }

    @Query(() => [Cliente])
    async allClientes(): Promise<Cliente[]> {
        return this.clienteService.findAll();
    }

    @Query(() => Cliente)
    async cliente(@Args('id') id: number): Promise<Cliente> {
        return this.clienteService.findById(id);
    }

    @Mutation(() => Cliente)
    async updateCliente(
        @Args('id') id: number,
        @Args('data') data?: ClienteInput,
    ): Promise<Cliente> {
        return this.clienteService.findAndUpdate(id, data);
    }

    @Mutation(() => Boolean)
    async deleteCliente(@Args('id') id: number): Promise<boolean> {
        return this.clienteService.delete(id);
    }
}
