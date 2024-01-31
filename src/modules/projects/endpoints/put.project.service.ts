import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateProjectDTO } from '../dto/create-project.dto';

@Injectable()
export class UpdateProjectService {
    constructor(private prisma: PrismaService) { }

    async update(id: string, data: CreateProjectDTO) {
        const projectExist = await this.prisma.project.findUnique({
            where: {
                id,
            },
        });

        if (!projectExist) {
            throw new Error('Projeto não existe!');
        }

        const project = await this.prisma.project.update({
            where: {
                id,
            },
            data,
        });

        return project;
    }
}
