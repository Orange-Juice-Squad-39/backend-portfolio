import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { UsersController } from './users.controller';
import { GetUsersService } from './endpoints/get.users.service';

@Module({
  controllers: [UsersController],
  providers: [PrismaService, GetUsersService],
})
export class UsersModule {}
