import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.controller';
import { ProjectsController } from './projects.controller';
import { PrismaService } from 'src/database/PrismaService';
import { DeleteProjectService } from './endpoints/delete.projects.service';
import { GetProjectsService } from './endpoints/get.projects.service';
import { UpdateProjectService } from './endpoints/put.project.service';
import { CreateProjectService } from './endpoints/post.project.service';

@Module({
  controllers: [ProjectsController,],
  providers: [ProjectsService, PrismaService],
  exports: [
    DeleteProjectService,
    GetProjectsService,
    UpdateProjectService,
    CreateProjectService
  ]
})
export class ProjectsModule { };
export { ProjectsService };