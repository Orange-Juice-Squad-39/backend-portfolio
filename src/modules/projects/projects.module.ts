import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { ProjectsController } from './projects.controller';
import { GetProjectsService } from './endpoints/get.projects.service';
import { PostProjectsService } from './endpoints/post.projects.service';
import { PutProjectsService } from './endpoints/put.projects.service';
import { DeleteProjectsService } from './endpoints/delete.projects.service';

@Module({
  controllers: [ProjectsController],
  providers: [
    PrismaService,
    DeleteProjectsService,
    GetProjectsService,
    PutProjectsService,
    PostProjectsService,
  ],
  exports: [
    DeleteProjectsService,
    GetProjectsService,
    PutProjectsService,
    PostProjectsService,
  ],
})
export class ProjectsModule {}
