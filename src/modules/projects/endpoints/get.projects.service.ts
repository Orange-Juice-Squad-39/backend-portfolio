import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { HttpException } from '@nestjs/common';

@Injectable()
export class GetProjectsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    try {
      const projects = await this.prisma.project.findMany();

      if (!projects || projects.length === 0) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Nenhum projeto encontrado',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return projects;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Erro ao obter projetos',
          details: error.message || 'Erro interno do servidor',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
