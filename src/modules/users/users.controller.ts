import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { GetUsersService } from './endpoints/get.users.service';
import { PostUsersService } from './endpoints/post.users.service';
import { UpdateUserDTO } from './dto/update-user.dto';
import { PutUsersService } from './endpoints/put.users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly getUsersService: GetUsersService,
    private readonly postUsersService: PostUsersService,
    private readonly putUsersService: PutUsersService,
  ) {}

  // Controllers GET:
  @Get('get-users')
  async getAllUsers() {
    return this.getUsersService.findAllUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.getUsersService.findOneUser(id);
  }

  // Controllers POST:
  @Post('register-user')
  async registerUser(@Body() data: CreateUserDTO) {
    return this.postUsersService.createOneUser(data);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() data: UpdateUserDTO) {
    return this.putUsersService.updateUser(id, data);
  }
}
