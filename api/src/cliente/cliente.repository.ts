import { Repository, EntityRepository } from 'typeorm';
import { Cliente } from './cliente.entity';
import { CreateClienteInput } from './dto/create-cliente.type';
import { UpdateClienteInput } from './dto/update-cliente.type';

@EntityRepository(Cliente)
export class ClienteRepository extends Repository<Cliente> {
  async createAndSave(createClienteInput: CreateClienteInput): Promise<Cliente> {
    const Cliente = await this.save(this.create(createClienteInput));
    return await this.findById(Cliente.id);
  }

  async findAll(): Promise<Cliente[]> {
    return this.find();
  }

  async findById(id: number): Promise<Cliente> {
    return await this.findOne(id);
  }

  async findAndUpdate(dbCliente: Cliente, data: UpdateClienteInput): Promise<Cliente> {
    await this.update(dbCliente.id, { ...data });
    const updatedCliente = this.create({ ...dbCliente, ...data });
    return updatedCliente;
  }

  async deleteById(id: number): Promise<boolean> {
    await this.delete(id);
    return true;
  }
}