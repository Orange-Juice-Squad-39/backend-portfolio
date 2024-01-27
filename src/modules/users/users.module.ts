import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { UsersController } from './users.controller';
import { GetUsersService } from './endpoints/get.users.service';
import { PostUsersService } from './endpoints/post.users.service';
import { PutUsersService } from './endpoints/put.users.service';

@Module({
  controllers: [UsersController],
  providers: [
    PrismaService,
    GetUsersService,
    PostUsersService,
    PutUsersService,
  ],
})
export class UsersModule {}
