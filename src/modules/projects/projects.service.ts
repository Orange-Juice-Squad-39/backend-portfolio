import { Injectable } from '@nestjs/common';
import { ProjectDTO } from './prisma.projec.dto'
import { PrismaService } from 'src/DB/prisma.service';


@Injectable()
export class ProjectsService {

  constructor(private prisma: PrismaService) { }

  async create(data: ProjectDTO) {

    const projectExists = await this.prisma.project.findFirst({
      where: {
        link: data.link
      }
    })

    if (projectExists) {
      throw new Error('O projeto já existe.');
    }

    const projects = await this.prisma.project.create({
      data
    })

    return projects;
  }
  async findAll() {
    return this.prisma.project.findMany()
  }

  async update(id: string, data: ProjectDTO) {
    const projectExist = await this.prisma.project.findUnique({
      where: {
        id,
      },
    });

    if (!projectExist) {
      throw new Error('projeto nao existe!');
    }

    const project = await this.prisma.project.update({
      where: {
        id
      },
      data
    });
    return project;
  }
  async delete(id: string) {
    const projectExist = await this.prisma.project.findUnique({
      where: {
        id,
      },
    });

    if (!projectExist) {
      throw new Error('Projeto não existe!');
    }

    return await this.prisma.project.delete({
      where: {
        id,
      },
    });
  }
}

