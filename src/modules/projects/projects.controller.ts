import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateProjectDTO } from './dto/create-project.dto';
import { UpdateProjectDTO } from './dto/update-project.dto';
import { GetProjectsService } from './endpoints/get.projects.service';
import { PostProjectsService } from './endpoints/post.projects.service';
import { PutProjectsService } from './endpoints/put.projects.service';
import { DeleteProjectsService } from './endpoints/delete.projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly postProjectService: PostProjectsService,
    private readonly getProjectsService: GetProjectsService,
    private readonly updateProjectService: PutProjectsService,
    private readonly deleteProjectService: DeleteProjectsService,
  ) {}

  // Controllers GET:
  @Get(':id')
  async getProjectsOfUSer(@Param('id') id: string) {
    return this.getProjectsService.findProjectsOfUser(id);
  }
  @Get()
  async getAllProjects() {
    return this.getProjectsService.findAllProjects();
  }

  // Controllers POST:
  @Post('register-proj')
  async registerProject(@Body() data: CreateProjectDTO) {
    return this.postProjectService.createOneProject(data);
  }

  // Controllers PATCH:
  @Patch(':id')
  async updateProject(@Param('id') id: string, @Body() data: UpdateProjectDTO) {
    return this.updateProjectService.updateOneProject(id, data);
  }

  // Controllers DELETE:
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.deleteProjectService.deleteOneProject(id);
  }
}
