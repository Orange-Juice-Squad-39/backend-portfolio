import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateUserDTO } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PostUsersService {
  constructor(private prisma: PrismaService) {}

  async createOneUser({ name, lastName, email, password }: CreateUserDTO) {
    try {
      const userExists = await this.prisma.user.findFirst({
        where: {
          email: email.toLowerCase(),
          activated: true,
        },
      });

      if (userExists) {
        throw new HttpException(
          {
            message: 'Este email já está cadastrado',
            status: HttpStatus.CONFLICT,
          },
          HttpStatus.CONFLICT,
        );
      }

      const createdUser = await this.prisma.user.create({
        data: {
          name,
          lastName,
          email: email.toLowerCase(),
        },
      });

      const passwordHashing = await bcrypt.hash(password, 10);

      const login = {
        id: createdUser.id,
        username: email.toLowerCase(),
        password: passwordHashing,
      };

      await this.prisma.login.create({ data: login });

      return {
        message: 'Cadastro feito com sucesso',
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Erro ao cadastrar usuário',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
