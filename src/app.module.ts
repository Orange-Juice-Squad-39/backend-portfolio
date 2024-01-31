import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, ProjectsModule, AuthModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
