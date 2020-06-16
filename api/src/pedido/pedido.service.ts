import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoRepository } from './pedido.repository';
import { Pedido } from './pedido.entity';
import { CreatePedidoInput } from './dto/create-pedido.type';
import { UpdatePedidoInput } from './dto/update-pedido.type';
import { JoinColumn } from 'typeorm';

@Injectable()
export class PedidoService {
    constructor(
        @InjectRepository(Pedido)
        private pedidoRepository: PedidoRepository,
    ) { }

    async createAndSave(createPedidoInput: CreatePedidoInput): Promise<Pedido> {
        return this.pedidoRepository.createAndSave(createPedidoInput);
    }

    async findAll(): Promise<Pedido[]> {
        return this.pedidoRepository
        .createQueryBuilder("pedido")
        .innerJoinAndSelect("pedido.cliente", "cliente")
        .orderBy("pedido.id", "DESC")
        .printSql()
        .getMany();
    }

    async findById(id: number): Promise<Pedido> {
        const pedido = await this.pedidoRepository.findById(id);
        if (!pedido) {
            throw new NotFoundException('Pedido não encontrado');
        }
        return pedido;
    }

    async findAndUpdate(id: number, data?: UpdatePedidoInput): Promise<Pedido> {
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