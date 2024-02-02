import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class GetProjectsService {
  constructor(private prisma: PrismaService) {}

  async findProjectsOfUser(id: string) {
    try {
      const projects = await this.prisma.project.findMany({
        where: {
          userId: id,
          activated: true,
        },
      });

      return projects;
    } catch (error) {
      throw new HttpException(
        {
          message: 'Erro ao buscar projetos do usuário',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllProjects() {
    try {
      const projects = await this.prisma.project.findMany({
        where: {
          activated: true,
        },
      });
      const quantity = await this.prisma.project.count({
        where: {
          activated: true,
        },
      });

      return { quantity, projects };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Erro ao buscar projetos',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
