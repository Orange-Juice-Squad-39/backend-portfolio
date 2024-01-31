import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { GetUsersService } from 'src/modules/users/endpoints/get.users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/modules/users/entities/user.entity';
import { UserPayload } from './entities/user.payload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './entities/user.token';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly getUsersService: GetUsersService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: User): UserToken {
    const userPayload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      lastName: user.lastName,
    };

    const jwtToken = this.jwtService.sign(userPayload);

    return {
      accessToken: jwtToken,
    };
  }

  async validateUser(username: string, password: string) {
    const userExists = await this.getUsersService.findLoginUser(username);

    if (userExists) {
      const passwordValid = await bcrypt.compare(password, userExists.password);

      if (passwordValid) {
        return this.getUsersService.findOneUser(userExists.id);
      }
    }
    throw new HttpException(
      {
        message: 'Email ou senha incorretos',
        status: HttpStatus.UNAUTHORIZED,
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
