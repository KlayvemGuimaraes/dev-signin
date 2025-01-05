import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { HttpStatus } from '@nestjs/common';
import { User } from './models/users.model';
import { SignupDto } from './dto/signup.dto';
import { Post, HttpCode, Body, Get,UseGuards } from '@nestjs/common';
import { SigninDto } from './dto/signin.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,){}

    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    public async singup(@Body() signupDto: SignupDto): Promise<User> {
      return this.usersService.signup(signupDto);
    }

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    public async sigin(@Body() signinDto: SigninDto): Promise<{name: string, jwtToken: string, email: string}> {
      return this.usersService.signin(signinDto);
    }

    @Get()
    @UseGuards(AuthGuard('jwt')) // apenas o usuario com o token valido pode acessar
    @HttpCode(HttpStatus.OK)
    public async findall(): Promise<User[]> {
      return this.usersService.findAll();
    }
}
