import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
//import { User } from 'src/modules/users/entities/user.entity';

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

  async findDiscoveredProjects(id: string) {
    try {
      const discoveryProject = await this.prisma.project.findMany({
        where: {
          userId: {
            not: id,
          },
          activated: true,
        },
        include: {
          user: {
            select: {
              urlImageUser: true,
              name: true,
              lastName: true,
            },
          },
        },
        take: 30,
      });

      return discoveryProject;
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

  async findProjectByTag(userId: string, search: string) {
    try {
      const projectsByTag = await this.prisma.project.findMany({
        where: {
          tags: {
            contains: search.toLowerCase(),
          },
          userId: {
            not: userId,
          },
        },
        take: 30,
      });

      if (projectsByTag.length < 30) {
        const projectsByTitle = await this.prisma.project.findMany({
          where: {
            title: {
              contains: search.toLowerCase(),
            },
            userId: {
              not: userId,
            },
          },
          take: 30 - projectsByTag.length,
        });

        return [...projectsByTag, ...projectsByTitle];
      }

      return projectsByTag;
    } catch (error) {
      throw new HttpException(
        {
          message: 'Erro ao buscar projetos por tag',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
