import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { ProdutoService } from './produto.service';
import { Produto } from './produto.entity';
import { ProdutoInput } from './input/produto.input';

@Resolver('Produto')
export class ProdutoResolver {
    constructor(private ProdutoService: ProdutoService) { }
    @Mutation(returns => Produto)
    async createProduto(@Args('data') data: ProdutoInput): Promise<Produto> {
        return this.ProdutoService.createAndSave(data);
    }

    @Query(returns => [Produto])
    async allProdutos(): Promise<Produto[]> {
        return this.ProdutoService.findAll();
    }

    @Query(returns => Produto)
    async produto(@Args('id') id: number): Promise<Produto> {
        return this.ProdutoService.findById(id);
    }

    @Mutation(returns => Produto)
    async updateProduto(
        @Args('id') id: number,
        @Args('data') data?: ProdutoInput,
    ): Promise<Produto> {
        return this.ProdutoService.findAndUpdate(id, data);
    }

    @Mutation(returns => Boolean)
    async deleteProduto(@Args('id') id: number): Promise<boolean> {
        return this.ProdutoService.delete(id);
    }
}
