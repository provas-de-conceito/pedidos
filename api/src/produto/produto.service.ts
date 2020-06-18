import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdutoRepository } from './produto.repository';
import { Produto } from './produto.entity';
import { ProdutoInput } from './input/produto.input';

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(Produto)
        private produtoRepository: ProdutoRepository,
    ) { }

    async createAndSave(produtoInput: ProdutoInput): Promise<Produto> {
        return this.produtoRepository.createAndSave(produtoInput);
    }

    async findAll(): Promise<Produto[]> {
        return this.produtoRepository.findAll();
    }

    async findByIds(ids: number[]): Promise<Produto[]> {
        return this.produtoRepository.findByIds(ids);
    }

    async findById(id: number): Promise<Produto> {
        const produto = await this.produtoRepository.findById(id);
        if (!produto) {
            throw new NotFoundException('Produto não encontrado');
        }
        return produto;
    }

    async findAndUpdate(id: number, data?: ProdutoInput): Promise<Produto> {
        const dbProduto = await this.findById(id);
        return this.produtoRepository.findAndUpdate(dbProduto, data);
    }

    async delete(id: number): Promise<boolean> {
        const dbProduto = await this.findById(id);
        const deleted = await this.produtoRepository.deleteById(dbProduto.id);
        if (deleted) {
            return true;
        }
        return false;
    }
}