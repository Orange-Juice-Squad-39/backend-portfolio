import { Body, Controller, Post } from '@nestjs/common';
import { CreateLoginDTO } from './dto/create-login.dto';
import { LoginsService } from './logins.service';

@Controller('login')
export class LoginsController {
  constructor(private readonly loginsService: LoginsService) {}

  @Post()
  create(@Body() data: CreateLoginDTO) {
    return this.loginsService.createLogin(data);
  }
}
