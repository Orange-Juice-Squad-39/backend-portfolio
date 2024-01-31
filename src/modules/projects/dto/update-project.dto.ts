import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDTO } from '../dto/create-project.dto';

export class UpdateUserDTO extends PartialType(CreateProjectDTO) {}

export { CreateProjectDTO };
