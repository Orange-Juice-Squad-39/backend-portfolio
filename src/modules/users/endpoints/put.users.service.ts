import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { UpdateUserDTO } from '../dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PutUsersService {
  constructor(private prisma: PrismaService) {}

  async updateOneUser(id: string, data: UpdateUserDTO) {
    try {
      const userExists = await this.prisma.user.findUnique({
        where: {
          id,
          activated: true,
        },
      });

      if (!userExists) {
        throw new HttpException(
          {
            message: 'Usuário não encontrado',
            status: HttpStatus.NOT_FOUND,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.prisma.user.update({
        data: {
          name: data.name,
          lastName: data.lastName,
          email: data.email.toLowerCase(),
        },
        where: {
          id: id,
          activated: true,
        },
      });

      if (data.email) {
        await this.prisma.login.update({
          data: {
            username: data.email.toLowerCase(),
          },
          where: {
            id: id,
            activated: true,
          },
        });
      }

      if (data.password) {
        const passwordHashing = await bcrypt.hash(data.password, 10);
        await this.prisma.login.update({
          data: {
            password: passwordHashing,
          },
          where: {
            id: id,
            activated: true,
          },
        });
      }

      return {
        message: 'Informações atualizadas com sucesso',
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Erro ao atualizar dados do usuário',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
