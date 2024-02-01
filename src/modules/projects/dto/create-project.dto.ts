import { Length } from 'class-validator';

export class CreateProjectDTO {
  @Length(2, 100)
  title: string;

  @Length(2, 200)
  link: string;

  @Length(2, 50)
  tags: string;

  @Length(2, 500)
  description: string;
}
