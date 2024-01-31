import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateProjectDTO } from '../dto/create-project.dto';

@Injectable()
export class CreateProjectService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProjectDTO) {
    const projectExists = await this.prisma.project.findFirst({
      where: {
        link: data.link,
      },
    });

    if (projectExists) {
      throw new Error('O projeto já existe.');
    }

    const project = await this.prisma.project.create({ data });
    return project;
  }
}
