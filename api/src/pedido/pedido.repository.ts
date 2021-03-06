import { Repository, EntityRepository } from 'typeorm';
import { Pedido } from './pedido.entity';
import { PedidoInput } from './input/pedido.input';

@EntityRepository(Pedido)
export class PedidoRepository extends Repository<Pedido> {
  async createAndSave(pedidoInput: PedidoInput): Promise<Pedido> {
    const Pedido = await this.save(this.create(pedidoInput));
    return await this.findById(Pedido.id);
  }

  async findAll(): Promise<Pedido[]> {
    return await this.find();
  }

  async findById(id: number): Promise<Pedido> {
    return await this.findOne(id);
  }

  async findByIds(ids: number[]): Promise<Pedido[]> {
    return await this.findByIds(ids);
  }

  async findByClienteId(cliente_id: number[]): Promise<Pedido[]> {
    return await this.createQueryBuilder("pedido")
      .where("cliente_id in (:...cliente_id)",{ cliente_id: cliente_id })
      .getMany();
  }

  async findAndUpdate(dbPedido: Pedido, data: PedidoInput): Promise<Pedido> {
    await this.update(dbPedido.id, { ...data });
    const updatedPedido = this.create({ ...dbPedido, ...data });
    return updatedPedido;
  }

  async deleteById(id: number): Promise<boolean> {
    await this.delete(id);
    return true;
  }
}