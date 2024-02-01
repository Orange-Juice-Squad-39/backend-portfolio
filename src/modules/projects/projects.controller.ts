import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateProjectDTO } from '../projects/dto/update-project.dto';
import { PostProjectService } from '../projects/endpoints/post.project.service';
import { GetProjectsService } from '../projects/endpoints/get.projects.service';
import { UpdateProjectService } from '../projects/endpoints/put.project.service';
import { DeleteProjectService } from '../projects/endpoints/delete.projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly postProjectService: PostProjectService,
    private readonly getProjectsService: GetProjectsService,
    private readonly updateProjectService: UpdateProjectService,
    private readonly deleteProjectService: DeleteProjectService,
  ) {}

  @Post()
  async create(@Body() data: CreateProjectDTO) {
    return this.postProjectService.create(data);
  }

  @Get()
  async findAll() {
    return this.getProjectsService.findAll();
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: CreateProjectDTO) {
    return this.updateProjectService.update(id, data);
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.deleteProjectService.delete(id);
  }
}
