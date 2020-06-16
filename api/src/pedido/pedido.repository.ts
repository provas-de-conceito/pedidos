import { Repository, EntityRepository } from 'typeorm';
import { Pedido } from './pedido.entity';
import { CreatePedidoInput } from './dto/create-pedido.type';
import { UpdatePedidoInput } from './dto/update-pedido.type';

@EntityRepository(Pedido)
export class PedidoRepository extends Repository<Pedido> {
  async createAndSave(createPedidoInput: CreatePedidoInput): Promise<Pedido> {
    const Pedido = await this.save(this.create(createPedidoInput));
    return await this.findById(Pedido.id);
  }

  async findAll(): Promise<Pedido[]> {
    return this.find();
  }

  async findById(id: number): Promise<Pedido> {
    return await this.findOne(id);
  }

  async findAndUpdate(dbPedido: Pedido, data: UpdatePedidoInput): Promise<Pedido> {
    await this.update(dbPedido.id, { ...data });
    const updatedPedido = this.create({ ...dbPedido, ...data });
    return updatedPedido;
  }

  async deleteById(id: number): Promise<boolean> {
    await this.delete(id);
    return true;
  }
}