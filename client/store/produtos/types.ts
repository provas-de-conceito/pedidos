import { ActionContext, ActionTree, MutationTree, GetterTree } from 'vuex';
import { RootState } from '@/store/types';
import { Produto } from '@/types';

export interface ProdutosState {
  produtos: Array<Produto>;
}

export type ProdutoActionContext = ActionContext<ProdutosState, RootState>;

export interface ProdutosActions extends ActionTree<ProdutosState, RootState> {
  addProduto: (ctx: ProdutoActionContext, produto: Produto) => void;
}

export interface ProdutosMutations extends MutationTree<ProdutosState> {
  addProduto: (state: ProdutosState, produto: Produto) => void;
}

export type ProdutosGetters = GetterTree<ProdutosState, RootState>;
