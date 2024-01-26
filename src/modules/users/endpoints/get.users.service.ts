import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class GetUsersService {
  constructor(private prisma: PrismaService) {}

  async findAllUsers() {
    try {
      const users = await this.prisma.user.findMany();
      const quantity = await this.prisma.user.count();

      return { quantity, users };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Erro ao buscar usuários',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOneUser(id: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id: id } });

      return user;
    } catch (error) {
      throw new HttpException(
        {
          message: 'Erro ao buscar usuário',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
