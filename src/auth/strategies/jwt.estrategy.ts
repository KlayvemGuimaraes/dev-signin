import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
import { jwtPayload } from "../models/jwt-payload.model";
import { User } from "../../users/models/users.model";	

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(private readonly authService: AuthService){
    super({
      jwtFromRequest: authService.returnJwExtractor(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET
    })
  }

  async validate(jwtPayload: jwtPayload): Promise<User>{
    const user = await this.authService.validateUser(jwtPayload);
    if(!user){
      throw new UnauthorizedException()
    }
    return user;
  }
}