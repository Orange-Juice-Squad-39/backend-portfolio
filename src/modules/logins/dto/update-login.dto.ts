import { PartialType } from '@nestjs/mapped-types';
import { CreateLoginDTO } from './create-login.dto';

export class UpdateLoginDTO extends PartialType(CreateLoginDTO) {}
