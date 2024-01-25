import { Controller, Get, Param } from '@nestjs/common';
import { GetUsersService } from './endpoints/get.users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly projectsService: GetUsersService) {}

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }
}
