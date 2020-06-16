import { Repository, EntityRepository } from 'typeorm';
import { Produto } from './produto.entity';
import { CreateProdutoInput } from './dto/create-produto.type';
import { UpdateProdutoInput } from './dto/update-produto.type';

@EntityRepository(Produto)
export class ProdutoRepository extends Repository<Produto> {
  async createAndSave(createProdutoInput: CreateProdutoInput): Promise<Produto> {
    const Produto = await this.save(this.create(createProdutoInput));
    return await this.findById(Produto.id);
  }

  async findAll(): Promise<Produto[]> {
    return this.find();
  }

  async findById(id: number): Promise<Produto> {
    return await this.findOne(id);
  }

  async findAndUpdate(dbProduto: Produto, data: UpdateProdutoInput): Promise<Produto> {
    await this.update(dbProduto.id, { ...data });
    const updatedProduto = this.create({ ...dbProduto, ...data });
    return updatedProduto;
  }

  async deleteById(id: number): Promise<boolean> {
    await this.delete(id);
    return true;
  }
}