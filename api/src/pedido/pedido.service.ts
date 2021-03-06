import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoRepository } from './pedido.repository';
import { Pedido } from './pedido.entity';
import { PedidoInput } from './input/pedido.input';

@Injectable()
export class PedidoService {
    constructor(
        @InjectRepository(Pedido)
        private pedidoRepository: PedidoRepository,
    ) { }

    async createAndSave(pedidoInput: PedidoInput): Promise<Pedido> {
        return await this.pedidoRepository.createAndSave(pedidoInput);
    }

    async findAll(): Promise<Pedido[]> {
        return await this.pedidoRepository.findAll();
    }

    async findByIds(ids: number[]): Promise<Pedido[]> {
        return await this.pedidoRepository.findByIds(ids);
    }

    async findByClienteId(cliente_id: number[]): Promise<Pedido[]> {
        return await this.pedidoRepository.findByClienteId(cliente_id);
    }

    async findById(id: number): Promise<Pedido> {
        const pedido = await this.pedidoRepository.findById(id);
        if (!pedido) {
            throw new NotFoundException('Pedido não encontrado');
        }
        return pedido;
    }

    async findAndUpdate(id: number, data?: PedidoInput): Promise<Pedido> {
        const dbPedido = await this.findById(id);
        return this.pedidoRepository.findAndUpdate(dbPedido, data);
    }

    async delete(id: number): Promise<boolean> {
        const dbPedido = await this.findById(id);
        const deleted = await this.pedidoRepository.deleteById(dbPedido.id);
        if (deleted) {
            return true;
        }
        return false;
    }
}