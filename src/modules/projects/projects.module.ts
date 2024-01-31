import { Module } from '@nestjs/common';
import { ProjectsService } from '../projects/projects.controller';
import { ProjectsController } from './projects.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService,PrismaService],
})
export class ProjectsModule {}
export { ProjectsService };

