import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Cliente } from 'src/cliente/cliente.entity'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: 'jwtsecret',
        signOptions: {
          expiresIn: 216000, // 1 Hour: 60 * 60 * 60
        },
      }),
    }),
    TypeOrmModule.forFeature([Cliente]),

  ],
  providers: [
    JwtStrategy,
    AuthService,
  ],
  exports: [
    AuthService
  ],
})
export class AuthModule { }