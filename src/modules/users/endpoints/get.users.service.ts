import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class GetUsersService {
  constructor(private prisma: PrismaService) {}

  async findAllUsers() {
    try {
      const users = await this.prisma.user.findMany({
        where: {
          activated: true,
        },
      });
      const quantity = await this.prisma.user.count({
        where: {
          activated: true,
        },
      });

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
      const user = await this.prisma.user.findUnique({
        where: {
          id,
          activated: true,
        },
      });

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

  async findLoginUser(username: string) {
    try {
      const user = await this.prisma.login.findUnique({
        where: {
          username,
          activated: true,
        },
      });

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
  async findUserByEmail(email: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email,
          activated: true,
        },
      });

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
