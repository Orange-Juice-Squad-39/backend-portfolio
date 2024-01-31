import { IsUUID, Length } from 'class-validator';

export class CreateProjectDTO {
    @IsUUID()
    id?: string;

    @Length(2, 100)
    name: string;

    @Length(2, 100)
    description: string;

    @Length(2, 50)
    category: string;

    @Length(2, 500)
    details: string;
  link: any;
}