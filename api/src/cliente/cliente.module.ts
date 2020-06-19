import { Module, forwardRef } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteResolver } from './cliente.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteRepository } from './cliente.repository';
import { PedidoModule } from 'src/pedido/pedido.module';
import { ClienteLoaderByID } from './cliente.dataloader';
import { DataLoaderInterceptor } from 'nestjs-dataloader';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClienteRepository]),
    forwardRef(() => PedidoModule),
    AuthModule
  ],
  providers: [
    ClienteService, 
    ClienteResolver,
    ClienteLoaderByID,
    { useClass: DataLoaderInterceptor, provide: APP_INTERCEPTOR }
  ],
  exports: [ClienteService]
})
export class ClienteModule { }
