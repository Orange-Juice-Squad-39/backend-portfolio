import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDTO } from '../dto/create-project.dto';
import { IsUUID } from 'class-validator';

export class UpdateProjectDTO extends PartialType(CreateProjectDTO) {
  @IsUUID()
  id: string;
}
