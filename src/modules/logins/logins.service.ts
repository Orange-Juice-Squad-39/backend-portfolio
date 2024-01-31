import { Injectable } from '@nestjs/common';
import { CreateLoginDTO } from './dto/create-login.dto';
import { PrismaService } from 'src/database/PrismaService';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginsService {
  constructor(private readonly prisma: PrismaService) {}

  async createLogin({ id, username, password }: CreateLoginDTO) {
    const passwordHash = await bcrypt.hash(password, 10);

    await this.prisma.login.create({
      data: {
        id,
        username,
        password: passwordHash,
      },
    });
  }

  findLogin(id: number) {
    return `This action returns a #${id} login`;
  }
}
