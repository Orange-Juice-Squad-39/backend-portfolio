import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/modules/users/entities/user.entity';
import { AuthRequest } from '../entities/auth.request';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);
