import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { PedidoModule } from './pedido/pedido.module';
import { ClienteModule } from './cliente/cliente.module';
import { ProdutoModule } from './produto/produto.module';
import { PedidoItemModule } from './pedido-item/pedido-item.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'chcg86u1',
      password: 'dv1010aa',
      database: 'project-nest',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    PedidoModule,
    ClienteModule,
    ProdutoModule,
    PedidoItemModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
