import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Param,
} from '@nestjs/common';
import { CreateProjectDTO } from './dto/create-project.dto';
import { UpdateProjectDTO } from './dto/update-project.dto';
import { GetProjectsService } from './endpoints/get.projects.service';
import { PostProjectsService } from './endpoints/post.projects.service';
import { PutProjectsService } from './endpoints/put.projects.service';
import { DeleteProjectsService } from './endpoints/delete.projects.service';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly postProjectService: PostProjectsService,
    private readonly getProjectsService: GetProjectsService,
    private readonly updateProjectService: PutProjectsService,
    private readonly deleteProjectService: DeleteProjectsService,
  ) {}

  // Controllers GET:
  @Get('getproj')
  async getProjectsOfUSer(@CurrentUser() user: User) {
    return this.getProjectsService.findProjectsOfUser(user.id);
  }

  @Get('discovery')
  async getDiscoveredProjects(@CurrentUser() user: User) {
    return this.getProjectsService.findDiscoveredProjects(user.id);
  }

  @Get('search/:tag')
  async getSearchProjects(
    @CurrentUser() user: User,
    @Param('tag') tag: string,
  ) {
    return this.getProjectsService.findProjectByTag(user.id, tag);
  }

  // Controllers POST:
  @Post('registerproj')
  async registerProject(
    @CurrentUser() user: User,
    @Body() data: CreateProjectDTO,
  ) {
    return this.postProjectService.createOneProject(user.id, data);
  }

  // Controllers PATCH:
  @Patch('updateproj')
  async updateProject(
    @CurrentUser() user: User,
    @Body() data: UpdateProjectDTO,
  ) {
    return this.updateProjectService.updateOneProject(user.id, data);
  }

  // Controllers DELETE:
  @Delete('deleteproj')
  async delete(@CurrentUser() user: User, @Body() data: UpdateProjectDTO) {
    return this.deleteProjectService.deleteOneProject(user.id, data.id);
  }
}
