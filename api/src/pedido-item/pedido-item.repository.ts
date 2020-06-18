import { Repository, EntityRepository } from 'typeorm';
import { PedidoItem } from './pedido-item.entity';
import { PedidoItemInput } from './input/pedido-item.input';

@EntityRepository(PedidoItem)
export class PedidoItemRepository extends Repository<PedidoItem> {
  async createAndSave(pedidoItemInput: PedidoItemInput): Promise<PedidoItem> {
    const PedidoItem = await this.save(this.create(pedidoItemInput));
    return await this.findById(PedidoItem.pedido.id, PedidoItem.produto.id);
  }

  async findAll(): Promise<PedidoItem[]> {
    return await this.find();
  }

  async findById(pedido_id: number, produto_id: number): Promise<PedidoItem> {
    return await this.findById(pedido_id, produto_id);
  }

  async findByProdutoId(produto_id: number[]): Promise<PedidoItem[]> {
    return await this.createQueryBuilder()
      .where("produto_id in (:...produto_id)", { produto_id: produto_id })
      .getMany();
  }

  async findByPedidoId(pedido_id: number[]): Promise<PedidoItem[]> {
    return await this.createQueryBuilder()
      .where("pedido_id in (:...pedido_id)", { pedido_id: pedido_id })
      .getMany();
  }

  async findAndUpdate(dbPedidoItem: PedidoItem, data: PedidoItemInput): Promise<PedidoItem> {
    await this.createQueryBuilder().update(PedidoItem).set({
      qtd: data.qtd
    }).where("pedido_id = :pedido_id", { pedido_id: dbPedidoItem.pedido.id }).andWhere("produto_id = :produto_id", { produto_id: dbPedidoItem.produto.id }).execute();
    const updatedPedidoItem = this.create({ ...dbPedidoItem, ...data });
    return updatedPedidoItem;
  }

  async deleteById(pedido_id: number, produto_id: number): Promise<boolean> {
    await this.createQueryBuilder().delete().from(PedidoItem)
      .where("pedido_id = :pedido_id", { pedido_id: pedido_id }).andWhere("produto_id = :produto_id", { produto_id: produto_id }).execute();
    return true;
  }
}