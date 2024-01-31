import { IsEmail, Length } from 'class-validator';

export class CreateLoginDTO {
  id?: string;

  @IsEmail()
  username: string;

  @Length(8, 150)
  password: string;
}
