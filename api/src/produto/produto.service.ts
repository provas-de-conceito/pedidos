import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdutoRepository } from './produto.repository';
import { Produto } from './produto.entity';
import { CreateProdutoInput } from './dto/create-produto.type';
import { UpdateProdutoInput } from './dto/update-produto.type';

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(Produto)
        private produtoRepository: ProdutoRepository,
    ) { }

    async createAndSave(createProdutoInput: CreateProdutoInput): Promise<Produto> {
        return this.produtoRepository.createAndSave(createProdutoInput);
    }

    async findAll(): Promise<Produto[]> {
        // return this.produtoRepository.findAll();
        return this.produtoRepository.createQueryBuilder("produto.id, produto.client_id, cliente.nome").innerJoinAndSelect("produto.cliente_id", "cliente").orderBy("produto.id", "DESC").getMany();
    }

    async findById(id: number): Promise<Produto> {
        const produto = await this.produtoRepository.findById(id);
        if (!produto) {
            throw new NotFoundException('Produto não encontrado');
        }
        return produto;
    }

    async findAndUpdate(id: number, data?: UpdateProdutoInput): Promise<Produto> {
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