import { Resolver, Mutation, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.entity';
import { ClienteInput } from './input/cliente.input';
import { Pedido } from 'src/pedido/pedido.entity';
import { PedidoService } from 'src/pedido/pedido.service';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Token } from 'src/auth/token';
import { AuthService } from 'src/auth/auth.service';
import { SignInClienteInput } from './input/signin-cliente.input';

@Resolver(() => Cliente)
export class ClienteResolver {
    constructor(
        private clienteService: ClienteService,
        private pedidoService: PedidoService,
        private authService: AuthService
    ) { }

    @ResolveField(() => [Pedido])
    async pedidos(@Parent() cliente: Cliente): Promise<Pedido[]> {
        return this.pedidoService.findByClienteId([cliente.id])
    }

    @Query(() => [Cliente])
    async allClientes(): Promise<Cliente[]> {
        return this.clienteService.findAll();
    }

    @Query(() => Cliente)
    async cliente(@Args('id') id: number): Promise<Cliente> {
        return this.clienteService.findById(id);
    }

    @Query(() => Cliente)
    @UseGuards(GraphqlAuthGuard)
    async getCurrentUser(@CurrentUser() currentUser: Cliente): Promise<Cliente> {
        return currentUser
    }

    @Mutation(() => Token)
    async signUp(@Args('data') data: ClienteInput): Promise<Token> {
        return await this.authService.signUp(data)
    }

    @Mutation(() => Token)
    async signIn(@Args('data') data: SignInClienteInput): Promise<Token> {
        return await this.authService.signIn(data)
    }

    // @Mutation(() => Cliente)
    // async createCliente(@Args('data') data: ClienteInput): Promise<Cliente> {
    //     return this.clienteService.createAndSave(data);
    // }

    // @Mutation(() => Cliente)
    // async updateCliente(
    //     @Args('id') id: number,
    //     @Args('data') data?: ClienteInput,
    // ): Promise<Cliente> {
    //     return this.clienteService.findAndUpdate(id, data);
    // }

    // @Mutation(() => Boolean)
    // async deleteCliente(@Args('id') id: number): Promise<boolean> {
    //     return this.clienteService.delete(id);
    // }
}
