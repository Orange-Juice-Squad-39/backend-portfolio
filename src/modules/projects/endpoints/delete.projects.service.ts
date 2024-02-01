import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/PrismaService";


@Injectable()
export class DeleteProjectService {
  delete(id: string) {
    throw new Error('Method not implemented.');
  }
  constructor(private prisma: PrismaService) {}

  async deleteProject(id: string) {
    try {
      const project = await this.prisma.project.findUnique({
        where: { id },
      });

      if (!project) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Projeto não encontrado',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.prisma.project.delete({
        where: { id },
      });

      return { message: 'Projeto deletado com sucesso' };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Erro ao deletar projeto',
          details: error.message || 'Erro interno do servidor',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
