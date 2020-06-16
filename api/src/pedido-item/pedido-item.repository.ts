import { Repository, EntityRepository } from 'typeorm';
import { PedidoItem } from './pedido-item.entity';
import { CreatePedidoItemInput } from './dto/create-pedido-item.type';
import { UpdatePedidoItemInput } from './dto/update-pedido-item.type';

@EntityRepository(PedidoItem)
export class PedidoItemRepository extends Repository<PedidoItem> {
  async createAndSave(createPedidoItemInput: CreatePedidoItemInput): Promise<PedidoItem> {
    const PedidoItem = await this.save(this.create(createPedidoItemInput));
    return await this.findById(PedidoItem.pedido_id, PedidoItem.produto_id);
  }

  async findAll(): Promise<PedidoItem[]> {
    return this.find();
  }

  async findById(pedido_id: number, produto_id: number): Promise<PedidoItem> {
    return await this.findById(pedido_id, produto_id);
  }

  async findAndUpdate(dbPedidoItem: PedidoItem, data: UpdatePedidoItemInput): Promise<PedidoItem> {
    await this.createQueryBuilder().update(PedidoItem).set({
      pedido_id: data.pedido_id,
      produto_id: data.produto_id,
      qtd: data.qtd
    }).where("pedido_id = :pedido_id", { pedido_id: dbPedidoItem.pedido_id }).andWhere("produto_id = :produto_id", { produto_id: dbPedidoItem.produto_id }).execute();
    const updatedPedidoItem = this.create({ ...dbPedidoItem, ...data });
    return updatedPedidoItem;
  }

  async deleteById(pedido_id: number, produto_id: number): Promise<boolean> {
    await this.createQueryBuilder().delete().from(PedidoItem)
      .where("pedido_id = :pedido_id", { pedido_id: pedido_id }).andWhere("produto_id = :produto_id", { produto_id: produto_id }).execute();
    return true;
  }
}