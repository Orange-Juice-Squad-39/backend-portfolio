import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { User } from 'src/modules/users/entities/user.entity';

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

  async findDiscoveredProjects(user: User) {
    try {
      const tagsProjOfUser = await this.prisma.project
        .findMany({
          where: {
            userId: user.id,
          },
          select: {
            tags: true,
          },
        })
        .then((projects) =>
          projects
            .flatMap((projects) =>
              projects.tags.split(';').map((tags) => tags.trim()),
            )
            .filter((tag) => tag !== ''),
        );

      const uniqueTags = Array.from(new Set(tagsProjOfUser));

      return {
        tags: uniqueTags,
        user: user,
      };
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
