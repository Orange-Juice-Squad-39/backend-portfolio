import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { PrismaService } from 'src/database/PrismaService';
import { DeleteProjectService } from './endpoints/delete.projects.service';
import { GetProjectsService } from './endpoints/get.projects.service';
import { UpdateProjectService } from './endpoints/put.project.service';
import { CreateProjectService } from './endpoints/post.project.service';
import { CreateProjectDTO } from './dto/create-project.dto';

@Module({
  controllers: [ProjectsController],
  providers: [
    PrismaService,
    DeleteProjectService,
    GetProjectsService,
    UpdateProjectService,
    CreateProjectService
  ],
  exports: [
    DeleteProjectService,
    GetProjectsService,
    UpdateProjectService,
    CreateProjectService
  ]
})
export class ProjectsModule {
  findAll() {
    throw new Error('Method not implemented.');
  }
  create(data: CreateProjectDTO) {
    throw new Error('Method not implemented.');
  }
  update(id: string, data: CreateProjectDTO) {
    throw new Error('Method not implemented.');
  }
  delete(id: string) {
    throw new Error('Method not implemented.');
  }
};
