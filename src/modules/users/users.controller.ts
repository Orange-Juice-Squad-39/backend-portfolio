import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersService } from './endpoints/get.users.service';
import { PostUsersService } from './endpoints/post.users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly getUsersService: GetUsersService,
    private readonly postUsersService: PostUsersService,
  ) {}

  // Controllers GET:
  @Get()
  async getAllUsers() {
    return this.getUsersService.findAllUsers();
  }

  @Get(':id')
  async getOneUser(@Param('id') id: string) {
    return this.getUsersService.findOneUser(id);
  }

  // Controllers POST:
  @Post('register')
  async registerUser(@Body() data: CreateUserDto) {
    return this.postUsersService.createOneUser(data);
  }
}
