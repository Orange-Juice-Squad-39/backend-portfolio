import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ProjectsModule } from './modules/projects/projects.module';

@Module({
  imports: [UsersModule, ProjectsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
