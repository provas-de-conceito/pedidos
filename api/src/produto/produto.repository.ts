import { Repository, EntityRepository } from 'typeorm';
import { Produto } from './produto.entity';
import { ProdutoInput } from './input/produto.input';

@EntityRepository(Produto)
export class ProdutoRepository extends Repository<Produto> {
  async createAndSave(produtoInput: ProdutoInput): Promise<Produto> {
    const Produto = await this.save(this.create(produtoInput));
    return await this.findById(Produto.id);
  }

  async findAll(): Promise<Produto[]> {
    return this.find();
  }

  async findById(id: number): Promise<Produto> {
    return await this.findOne(id);
  }

  async findByIds(ids: number[]): Promise<Produto[]> {
    return await this.findByIds(ids);
  }

  async findAndUpdate(dbProduto: Produto, data: ProdutoInput): Promise<Produto> {
    await this.update(dbProduto.id, { ...data });
    const updatedProduto = this.create({ ...dbProduto, ...data });
    return updatedProduto;
  }

  async deleteById(id: number): Promise<boolean> {
    await this.delete(id);
    return true;
  }
}