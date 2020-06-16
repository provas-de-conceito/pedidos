import { ProdutosState } from './types';

export const initState = (): ProdutosState => ({
  produtos: [
    { id: 1, nome: 'P1', preco: 10 },
    { id: 2, nome: 'P2', preco: 20 },
    { id: 3, nome: 'P3', preco: 30 }
  ]
});

export default initState;
