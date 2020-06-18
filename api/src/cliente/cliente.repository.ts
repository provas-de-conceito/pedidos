import { Repository, EntityRepository } from 'typeorm';
import { Cliente } from './cliente.entity';
import { ClienteInput } from './input/cliente.input';

@EntityRepository(Cliente)
export class ClienteRepository extends Repository<Cliente> {
  async createAndSave(clienteInput: ClienteInput): Promise<Cliente> {
    const Cliente = await this.save(this.create(clienteInput));
    return await this.findById(Cliente.id);
  }

  async findAll(): Promise<Cliente[]> {
    return await this.find();
  }

  async findById(id: number): Promise<Cliente> {
    return await this.findOne(id);
  }

  async findByIds(ids: number[]): Promise<Cliente[]> {
    return await this.findByIds(ids);
  }

  async findAndUpdate(dbCliente: Cliente, data: ClienteInput): Promise<Cliente> {
    await this.update(dbCliente.id, { ...data });
    const updatedCliente = this.create({ ...dbCliente, ...data });
    return updatedCliente;
  }

  async deleteById(id: number): Promise<boolean> {
    await this.delete(id);
    return true;
  }
}