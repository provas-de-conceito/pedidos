import { Injectable } from "@nestjs/common";
import * as Dataloader from "dataloader";
import { NestDataLoader } from "nestjs-dataloader";
import { Cliente } from "./cliente.entity";
import { ClienteService } from "./cliente.service";

@Injectable()
export class ClienteLoaderByID implements NestDataLoader<number, Cliente> {
  constructor(private readonly clienteService: ClienteService) { }

  generateDataLoader(): Dataloader<number, Cliente> {
    return new Dataloader<number, Cliente>(keys => this.clienteService.findByIds([...keys]));
  }
}