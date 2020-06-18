import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.entity';
import { ClienteInput } from './input/cliente.input';

@Resolver('Cliente')
export class ClienteResolver {
    constructor(private ClienteService: ClienteService) { }

    @Mutation(returns => Cliente)
    async createCliente(@Args('data') data: ClienteInput): Promise<Cliente> {
        return this.ClienteService.createAndSave(data);
    }

    @Query(returns => [Cliente])
    async allClientes(): Promise<Cliente[]> {
        return this.ClienteService.findAll();
    }

    @Query(returns => Cliente)
    async cliente(@Args('id') id: number): Promise<Cliente> {
        return this.ClienteService.findById(id);
    }

    @Mutation(returns => Cliente)
    async updateCliente(
        @Args('id') id: number,
        @Args('data') data?: ClienteInput,
    ): Promise<Cliente> {
        return this.ClienteService.findAndUpdate(id, data);
    }

    @Mutation(returns => Boolean)
    async deleteCliente(@Args('id') id: number): Promise<boolean> {
        return this.ClienteService.delete(id);
    }
}
