import { Injectable } from "@nestjs/common";
import * as Dataloader from "dataloader";
import { NestDataLoader } from "nestjs-dataloader";
import { Produto } from "./produto.entity";
import { ProdutoService } from "./produto.service";

@Injectable()
export class ProdutoLoaderByID implements NestDataLoader<number, Produto> {
  constructor(private readonly produtoService: ProdutoService) { }

  generateDataLoader(): Dataloader<number, Produto> {
    return new Dataloader<number, Produto>(keys => this.produtoService.findByIds([...keys]));
  }
}