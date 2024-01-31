import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { AppController } from './app.controller';
import { LoginsModule } from './modules/logins/logins.module';

@Module({
  imports: [UsersModule, ProjectsModule, LoginsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
