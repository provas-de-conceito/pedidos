import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoItemRepository } from './pedido-item.repository';
import { PedidoItem } from './pedido-item.entity';
import { PedidoItemInput } from './input/pedido-item.input';

@Injectable()
export class PedidoItemService {
    constructor(
        @InjectRepository(PedidoItem)
        private pedidoItemRepository: PedidoItemRepository,
    ) { }

    async createAndSave(pedidoItemInput: PedidoItemInput): Promise<PedidoItem> {
        return this.pedidoItemRepository.createAndSave(pedidoItemInput);
    }

    async findAll(): Promise<PedidoItem[]> {
        return this.pedidoItemRepository.findAll();
    }

    async findById(pedido_id: number, produto_id: number): Promise<PedidoItem> {
        const PedidoItem = await this.pedidoItemRepository.findById(pedido_id, produto_id);
        if (!PedidoItem) {
            throw new NotFoundException('PedidoItem não encontrado');
        }
        return PedidoItem;
    }

    async findByPedidoId(pedido_id: number[]): Promise<PedidoItem[]> {
        return this.pedidoItemRepository.findByPedidoId(pedido_id);
    }

    async findByProdutoId(produto_id: number[]): Promise<PedidoItem[]> {
        return this.pedidoItemRepository.findByProdutoId(produto_id);
    }

    async findAndUpdate(pedido_id: number, produto_id: number, data?: PedidoItemInput): Promise<PedidoItem> {
        const dbPedidoItem = await this.findById(pedido_id, produto_id);
        return this.pedidoItemRepository.findAndUpdate(dbPedidoItem, data);
    }

    async delete(pedido_id: number, produto_id: number): Promise<boolean> {
        const dbPedidoItem = await this.findById(pedido_id, produto_id);
        const deleted = await this.pedidoItemRepository.deleteById(dbPedidoItem.pedido.id, dbPedidoItem.produto.id);
        if (deleted) {
            return true;
        }
        return false;
    }
}