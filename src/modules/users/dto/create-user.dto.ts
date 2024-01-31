import { IsEmail, Length } from 'class-validator';

export class CreateUserDTO {
  @Length(2, 15)
  name: string;

  @Length(2, 30)
  lastName: string;

  @IsEmail()
  @Length(2, 50)
  email: string;

  @Length(8, 20)
  password: string;
}
