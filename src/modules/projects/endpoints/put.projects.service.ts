import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { UpdateProjectDTO } from '../dto/update-project.dto';

@Injectable()
export class PutProjectsService {
  constructor(private prisma: PrismaService) {}

  async updateOneProject(userId: string, data: UpdateProjectDTO) {
    try {
      const projectExist = await this.prisma.project.findUnique({
        where: {
          userId,
          id: data.id,
          activated: true,
        },
      });

      if (!projectExist) {
        throw new HttpException(
          {
            message: 'Projeto não encontrado',
            status: HttpStatus.NOT_FOUND,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const updatedProject = await this.prisma.project.update({
        data,
        where: {
          userId,
          id: data.id,
          activated: true,
        },
      });

      return {
        message: 'Informações atualizadas com sucesso',
        user: updatedProject,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Erro ao atualizar dados do projeto',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
