import { ProdutosActions } from './types';

export const actions: ProdutosActions = {
  addProduto: (ctx, produto) => {
    ctx.commit('addProduto', produto);
  }
};

export default actions;
