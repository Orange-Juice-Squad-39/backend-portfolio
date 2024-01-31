import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class DeleteProjectService {
  constructor(private prisma: PrismaService) {}

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
