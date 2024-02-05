import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class DeleteProjectsService {
  constructor(private prisma: PrismaService) {}

  async deleteOneProject(userId: string, projId: string) {
    try {
      const projectExists = await this.prisma.project.findUnique({
        where: {
          userId,
          id: projId,
          activated: true,
        },
      });

      if (!projectExists) {
        throw new HttpException(
          {
            message: 'Projeto não encontrado ou já deletado',
            status: HttpStatus.NOT_FOUND,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.prisma.project.update({
        where: {
          userId,
          id: projId,
          activated: true,
        },
        data: {
          activated: false,
        },
      });

      return { message: 'Projeto deletado com sucesso' };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Erro ao deletar projeto',
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
  async deleteInactivatedProjects() {
    const passingDate = new Date();
    passingDate.setMonth(passingDate.getMonth() - 1);
    try {
      await this.prisma.project.deleteMany({
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
          message: 'Erro na remoção automática de projetos inativos',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
