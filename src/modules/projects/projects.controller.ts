import { Body, Controller, Post, Get, Param, Delete, Patch} from '@nestjs/common';
import { CreateProjectDTO } from '../projects/dto/update-project.dto'
import { ProjectsService } from '../projects/projects.module';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  @Post()
  async create(@Body() data: CreateProjectDTO) {
    return this.projectsService.create(data)
  }

  @Get()
  async findAll(){
    return this.projectsService.findAll()
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: CreateProjectDTO) {
    return this.projectsService.update(id, data);
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.projectsService.delete(id);
  }

}

export { ProjectsService };
