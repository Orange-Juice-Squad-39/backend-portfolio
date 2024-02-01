import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateProjectDTO } from '../dto/create-project.dto';

@Injectable()
export class UpdateProjectService {
  constructor(private prisma: PrismaService) {}

  async update(id: string, data: CreateProjectDTO) {
    try {
      const projectExist = await this.prisma.project.findUnique({
        where: {
          id,
        },
      });

      if (!projectExist) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Projeto não encontrado',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const updatedProject = await this.prisma.project.update({
        where: {
          id,
        },
        data,
      });

      return updatedProject;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Erro ao atualizar projeto',
          details: error.message || 'Erro interno do servidor',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
