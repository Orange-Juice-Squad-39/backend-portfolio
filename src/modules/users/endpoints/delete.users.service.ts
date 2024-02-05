import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class DeleteUsersService {
  constructor(private prisma: PrismaService) {}

  async deleteOneUser(id: string) {
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
            message: 'Usuário não encontrado ou já deletado',
            status: HttpStatus.NOT_FOUND,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.prisma.user.update({
        where: { id },
        data: {
          activated: false,
        },
      });
      await this.prisma.login.update({
        where: { id },
        data: {
          activated: false,
        },
      });
      await this.prisma.project.updateMany({
        where: {
          userId: id,
        },
        data: {
          activated: false,
        },
      });

      return { message: 'Usuário deletado com sucesso' };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Erro ao deletar usuário',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // TO DEPLOY:
  //@Cron('0 05 * * *')

  // TO TEST:
  @Cron(CronExpression.EVERY_2_HOURS)
  async deleteInactivatedUsers() {
    const passingDate = new Date();
    passingDate.setMonth(passingDate.getMonth() - 1);
    try {
      await this.prisma.user.deleteMany({
        where: {
          activated: false,
          updatedAt: {
            lte: passingDate,
          },
        },
      });
      await this.prisma.login.deleteMany({
        where: {
          activated: false,
          updatedAt: {
            lte: passingDate,
          },
        },
      });
    } catch (error) {
      throw new HttpException(
        {
          message: 'Erro na remoção automática de usuários inativos',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
