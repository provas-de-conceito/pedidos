import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClienteRepository } from './cliente.repository';
import { Cliente } from './cliente.entity';
import { CreateClienteInput } from './dto/create-cliente.type';
import { UpdateClienteInput } from './dto/update-cliente.type';

@Injectable()
export class ClienteService {
    constructor(
        @InjectRepository(Cliente)
        private clienteRepository: ClienteRepository,
    ) { }

    async createAndSave(createClienteInput: CreateClienteInput): Promise<Cliente> {
        return this.clienteRepository.createAndSave(createClienteInput);
    }

    async findAll(): Promise<Cliente[]> {
        return this.clienteRepository.findAll();
    }

    async findById(id: number): Promise<Cliente> {
        const cliente = await this.clienteRepository.findById(id);
        if (!cliente) {
            throw new NotFoundException('Cliente não encontrado');
        }
        return cliente;
    }

    async findAndUpdate(id: number, data?: UpdateClienteInput): Promise<Cliente> {
        const dbCliente = await this.findById(id);
        return this.clienteRepository.findAndUpdate(dbCliente, data);
    }

    async delete(id: number): Promise<boolean> {
        const dbCliente = await this.findById(id);
        const deleted = await this.clienteRepository.deleteById(dbCliente.id);
        if (deleted) {
            return true;
        }
        return false;
    }
}