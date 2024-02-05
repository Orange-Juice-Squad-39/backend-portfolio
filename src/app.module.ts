import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UsersModule, ProjectsModule, AuthModule,ConfigModule.forRoot(),],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
