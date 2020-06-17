import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoItemRepository } from './pedido-item.repository';
import { PedidoItem } from './pedido-item.entity';
import { CreatePedidoItemInput } from './dto/create-pedido-item.type';
import { UpdatePedidoItemInput } from './dto/update-pedido-item.type';

@Injectable()
export class PedidoItemService {
    constructor(
        @InjectRepository(PedidoItem)
        private PedidoItemRepository: PedidoItemRepository,
    ) { }

    async createAndSave(createPedidoItemInput: CreatePedidoItemInput): Promise<PedidoItem> {
        return this.PedidoItemRepository.createAndSave(createPedidoItemInput);
    }

    async findAll(): Promise<PedidoItem[]> {
        // return this.PedidoItemRepository.findAll();
        return this.PedidoItemRepository.createQueryBuilder("PedidoItem.id, PedidoItem.client_id, cliente.nome").innerJoinAndSelect("PedidoItem.cliente_id", "cliente").orderBy("PedidoItem.id", "DESC").getMany();
    }

    async findById(pedido_id: number, produto_id: number): Promise<PedidoItem> {
        const PedidoItem = await this.PedidoItemRepository.findById(pedido_id, produto_id);
        if (!PedidoItem) {
            throw new NotFoundException('PedidoItem não encontrado');
        }
        return PedidoItem;
    }

    async findAndUpdate(pedido_id: number, produto_id: number, data?: UpdatePedidoItemInput): Promise<PedidoItem> {
        const dbPedidoItem = await this.findById(pedido_id, produto_id);
        return this.PedidoItemRepository.findAndUpdate(dbPedidoItem, data);
    }

    async delete(pedido_id: number, produto_id: number): Promise<boolean> {
        const dbPedidoItem = await this.findById(pedido_id, produto_id);
        const deleted = await this.PedidoItemRepository.deleteById(dbPedidoItem.pedido.id, dbPedidoItem.produto.id);
        if (deleted) {
            return true;
        }
        return false;
    }
}