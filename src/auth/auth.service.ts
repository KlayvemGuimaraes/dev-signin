import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/models/users.model';
import { sign } from 'jsonwebtoken';
import { UnauthorizedException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { jwtPayload } from './models/jwt-payload.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly usersModel: Model<User>,
  ){}

  public async createAcessToken(userId: string): Promise<string> {
    return sign({ userId }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION}); // sign é uma função do jwt que cria um token, passamos o userId, a chave secreta e o tempo de expiração
  }

  public async validateUser(jwtPayload: jwtPayload): Promise<User> {
    const user = await this.usersModel.findOne({_id: jwtPayload.userId}); // procuramos o usuário pelo id
    if(!user) {
      throw new UnauthorizedException('User not found.');
    }
    return user;
  }

  private static jwtExtractor(request: Request):string {
    const authHeader = request.headers.authorization; // vem o token no header
     
    if(!authHeader) {
      throw new BadRequestException('Bad request.');
    }

    const [, token] = authHeader.split(' '); // dividimos o header em duas partes, o tipo e o token

    return token;
  }

  public returnJwExtractor(): (request: Request) => string {
    return this.jwtExtractor;
  }
}
