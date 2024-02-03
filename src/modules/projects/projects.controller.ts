import { Body, Controller, Post, Get, Param, Delete, Patch } from '@nestjs/common';
import { CreateProjectDTO } from '../projects/dto/update-project.dto'
import { CreateProjectService } from '../projects/endpoints/post.project.service';
import { GetProjectsService } from '../projects/endpoints/get.projects.service';
import { UpdateProjectService } from '../projects/endpoints/put.project.service';
import { DeleteProjectService } from '../projects/endpoints/delete.projects.service';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly createProjectService: CreateProjectService,
    private readonly getProjectsService: GetProjectsService,
    private readonly updateProjectService: UpdateProjectService,
    private readonly deleteProjectService: DeleteProjectService
  ) { }


  @Get()
  async findAll() {
    return this.getProjectsService.findAll()
  }

  @Post()
  async registerProject(@Body() data: CreateProjectDTO) {
    return this.createProjectService.create(data)
  }

  @Patch(':id')
  async updatePorject(@Param('id') id: string, @Body() data: CreateProjectDTO) {
    return this.updateProjectService.update(id, data);
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.deleteProjectService.delete(id);
  }

}
