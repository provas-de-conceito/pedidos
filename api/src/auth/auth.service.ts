import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { SignInClienteDto } from '../cliente/dto/signin-cliente.dto';
import { CreateClienteDto } from '../cliente/dto/create-cliente.dto';
import { Cliente } from '../cliente/cliente.entity'
import { JwtPayload } from './jwt-payload.interface'
import * as bcrypt from 'bcrypt'
import { ClienteRepository } from 'src/cliente/cliente.repository';
import { Token } from './token';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: ClienteRepository,
    private jwtService: JwtService,
  ) { }

  async signUp(createUserDto: CreateClienteDto): Promise<Token> {
    const { nome, email } = createUserDto
    const user = await this.clienteRepository.findOne({ email })
    if (user) {
      throw new ConflictException("User already exists")
    }
    const salt = bcrypt.genSaltSync(10)
    const senha = bcrypt.hashSync(createUserDto.senha, salt)
    const currentUser = { ...createUserDto, senha }
    try {
      this.clienteRepository.createAndSave(currentUser);
      const token = await this.getAccessToken(nome, email)
      return token
    }
    catch (error) {
      throw new InternalServerErrorException()
    }

  }

  async signIn(signinUserDto: SignInClienteDto): Promise<Token> {
    const { email, senha } = signinUserDto
    const user = await this.clienteRepository.findOne({ email })
    if (!user) {
      throw new UnauthorizedException("Invalid credentials")
    }
    const isValidPassword = await bcrypt.compare(senha, user.senha)
    if (!isValidPassword) {
      throw new UnauthorizedException("Invalid credentials")
    }
    const token = this.getAccessToken(user.nome, user.email)
    return token
  }

  private async getAccessToken(nome: string, email: string): Promise<Token> {
    const payload: JwtPayload = { nome, email }
    const token = this.jwtService.sign(payload)
    return {token};
  }
}
