import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { UpdateUserDTO } from '../dto/update-user.dto';

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

      const updatedUser = await this.prisma.user.update({
        data,
        where: {
          id: id,
          activated: true,
        },
      });

      return {
        message: 'Informações atualizadas com sucesso',
        user: updatedUser,
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
