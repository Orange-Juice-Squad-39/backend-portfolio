import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { UsersController } from './users.controller';
import { GetUsersService } from './endpoints/get.users.service';
import { PostUsersService } from './endpoints/post.users.service';
import { PutUsersService } from './endpoints/put.users.service';
import { DeleteUsersService } from './endpoints/delete.users.service';

@Module({
  controllers: [UsersController],
  providers: [
    PrismaService,
    GetUsersService,
    PostUsersService,
    PutUsersService,
    DeleteUsersService,
  ],
  exports: [
    GetUsersService,
    PostUsersService,
    PutUsersService,
    DeleteUsersService,
  ],
})
export class UsersModule {}
