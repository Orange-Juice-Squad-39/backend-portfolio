import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { PrismaService } from 'src/database/PrismaService';
import { DeleteProjectService } from './endpoints/delete.projects.service';
import { GetProjectsService } from './endpoints/get.projects.service';
import { UpdateProjectService } from './endpoints/put.project.service';

@Module({
  controllers: [ProjectsController],
  providers: [
    PrismaService,
    DeleteProjectService,
    GetProjectsService,
    UpdateProjectService,
    PostProjectsService,
  ],
  exports: [
    DeleteProjectService,
    GetProjectsService,
    UpdateProjectService,
    PostProjectsService,
  ],
})
export class ProjectsModule {}
