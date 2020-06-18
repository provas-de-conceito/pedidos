import { Injectable } from "@nestjs/common";
import * as Dataloader from "dataloader";
import { NestDataLoader } from "nestjs-dataloader";
import { Pedido } from "./pedido.entity";
import { PedidoService } from "./pedido.service";

@Injectable()
export class PedidoLoaderByID implements NestDataLoader<number, Pedido> {
  constructor(private readonly pedidoService: PedidoService) { }

  generateDataLoader(): Dataloader<number, Pedido> {
    return new Dataloader<number, Pedido>(keys => this.pedidoService.findByIds([...keys]));
  }
}

@Injectable()
export class PedidoLoaderByClientID implements NestDataLoader<number, Pedido> {
  constructor(private readonly pedidoService: PedidoService) { }

  generateDataLoader(): Dataloader<number, Pedido> {
    return new Dataloader<number, Pedido>(keys => this.pedidoService.findByClienteId([...keys]));
  }
}