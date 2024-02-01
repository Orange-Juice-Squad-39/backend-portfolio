import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateProjectDTO } from '../dto/create-project.dto';
import { HttpException } from '@nestjs/common';

@Injectable()
export class PostProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProjectDTO) {
    try {
      const projectExists = await this.prisma.project.findFirst({
        where: {
          link: data.link,
        },
      });

      if (projectExists) {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            error: 'O projeto já existe.',
          },
          HttpStatus.CONFLICT,
        );
      }

      const project = await this.prisma.project.create({ data });
      return project;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Erro ao criar projeto',
          details: error.message || 'Erro interno do servidor',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
