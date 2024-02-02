import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { AuthModule } from './modules/auth/AuthModule';



@Module({
  imports: [UsersModule, ProjectsModule,AuthModule],
  providers: [],
})
export class AppModule {}
