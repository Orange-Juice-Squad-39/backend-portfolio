import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateProjectDTO } from '../dto/create-project.dto';

@Injectable()
export class PostProjectsService {
  constructor(private prisma: PrismaService) {}

  async createOneProject(userId: string, data: CreateProjectDTO) {
    try {
      const projectExists = await this.prisma.project.findFirst({
        where: {
          link: data.link,
          activated: true,
          userId,
        },
      });

      if (projectExists) {
        throw new HttpException(
          {
            message: 'O projeto já está cadastrado',
            status: HttpStatus.CONFLICT,
          },
          HttpStatus.CONFLICT,
        );
      }

      const createdProject = await this.prisma.project.create({
        data: {
          title: data.title,
          link: data.link,
          tags: data.tags,
          description: data.description,
          urlImageProj: data.urlImageProj,
          userId: userId,
        },
      });

      return {
        message: 'Projeto criado com sucesso',
        status: HttpStatus.CREATED,
        project: createdProject,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Erro ao cadastrar projeto',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
