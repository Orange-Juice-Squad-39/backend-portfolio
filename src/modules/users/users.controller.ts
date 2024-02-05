import { Controller, Get, Post, Patch, Delete, Body } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { GetUsersService } from './endpoints/get.users.service';
import { PostUsersService } from './endpoints/post.users.service';
import { UpdateUserDTO } from './dto/update-user.dto';
import { PutUsersService } from './endpoints/put.users.service';
import { DeleteUsersService } from './endpoints/delete.users.service';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from './entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly getUsersService: GetUsersService,
    private readonly postUsersService: PostUsersService,
    private readonly putUsersService: PutUsersService,
    private readonly deleteUsersService: DeleteUsersService,
  ) {}

  // Controllers GET:
  @Get('getusers')
  async getAllUsers() {
    return this.getUsersService.findAllUsers();
  }

  @Get('getuser')
  async getUser(@CurrentUser() user: User) {
    return this.getUsersService.findOneUser(user.id);
  }

  // Controllers POST:
  @IsPublic()
  @Post('registeruser')
  async registerUser(@Body() data: CreateUserDTO) {
    return this.postUsersService.createOneUser(data);
  }

  // Controllers PATCH:
  @Patch('updateuser')
  async updateUser(@CurrentUser() user: User, @Body() data: UpdateUserDTO) {
    return this.putUsersService.updateOneUser(user.id, data);
  }

  // Controllers DELETE:
  @Delete('deleteuser')
  async deleteUser(@CurrentUser() user: User) {
    return this.deleteUsersService.deleteOneUser(user.id);
  }
}
