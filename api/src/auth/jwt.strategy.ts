import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ClienteRepository } from 'src/cliente/cliente.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { Cliente } from 'src/cliente/cliente.entity'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: ClienteRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      ignoreExpiration: false,
      secretOrKey: 'jwt_secret',
    })
  }

  async validate(payload: any): Promise<Cliente | null> {
    const { email } = payload
    const user = await this.clienteRepository.findOne({
      email
    })
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}