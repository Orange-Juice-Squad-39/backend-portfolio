import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateUserDTO } from '../dto/create-user.dto';
import { LoginsService } from 'src/modules/logins/logins.service';

@Injectable()
export class PostUsersService {
  constructor(
    private prisma: PrismaService,
    private loginService: LoginsService,
  ) {}

  async createOneUser({ name, lastName, email, password }: CreateUserDTO) {
    try {
      const userExists = await this.prisma.user.findFirst({
        where: {
          email: email,
          activated: true,
        },
      });

      if (userExists) {
        throw new HttpException(
          {
            message: 'Este email já está cadastrado',
            status: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const createdUser = await this.prisma.user.create({
        data: {
          name,
          lastName,
          email,
        },
      });

      const login = {
        id: createdUser.id,
        username: email,
        password: password,
      };

      await this.loginService.createLogin(login);

      return {
        message: 'Cadastro feito com sucesso',
        user: createdUser,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Erro ao cadastrar usuário',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
