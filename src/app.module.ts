import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { AppController } from './app.controller';

@Module({
  imports: [UsersModule, ProjectsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
