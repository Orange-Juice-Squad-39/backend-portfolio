import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class PostUsersService {
  constructor(private prisma: PrismaService) {}

  async createOneUser(data: CreateUserDto) {
    try {
      const userExists = await this.prisma.user.findFirst({
        where: { email: data.email },
      });

      if (userExists) {
        throw new HttpException(
          {
            message: 'Este email já está cadastrado',
            status: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const createdUser = await this.prisma.user.create({ data });

      return {
        message: 'Cadastro feito com sucesso',
        user: createdUser,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: `Erro ao cadastrar, ${data.name}`,
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
