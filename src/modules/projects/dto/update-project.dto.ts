import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDTO } from '../dto/create-project.dto';

export class UpdateProjectDTO extends PartialType(CreateProjectDTO) {}
