import { ProdutosMutations, ProdutosState } from './types';
import { Produto } from '~/types';

export const mutations: ProdutosMutations = {
  addProduto: (state: ProdutosState, produto: Produto) => {
    state.produtos.push(produto);
  }
};

export default mutations;
