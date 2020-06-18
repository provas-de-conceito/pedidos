import { Injectable } from "@nestjs/common";
import * as Dataloader from "dataloader";
import { NestDataLoader } from "nestjs-dataloader";
import { PedidoItem } from "./pedido-item.entity";
import { PedidoItemService } from "./pedido-item.service";

@Injectable()
export class PedidoItemLoaderByProdutoID implements NestDataLoader<number, PedidoItem> {
  constructor(private readonly pedidoItemService: PedidoItemService) { }

  generateDataLoader(): Dataloader<number, PedidoItem> {
    return new Dataloader<number, PedidoItem>(keys => this.pedidoItemService.findByProdutoId([...keys]));
  }
}

@Injectable()
export class PedidoItemLoaderByPedidoID implements NestDataLoader<number, PedidoItem> {
  constructor(private readonly pedidoItemService: PedidoItemService) { }

  generateDataLoader(): Dataloader<number, PedidoItem> {
    return new Dataloader<number, PedidoItem>(keys => this.pedidoItemService.findByPedidoId([...keys]));
  }
}