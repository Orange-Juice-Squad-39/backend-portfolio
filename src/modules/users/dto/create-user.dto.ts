import { IsUUID, IsEmail, Length } from 'class-validator';
//import { User } from '../entities/user.entity';

export class CreateUserDto {
  @IsUUID()
  id: string;

  @Length(2, 15)
  name: string;

  @Length(2, 30)
  lastName: string;

  @IsEmail()
  @Length(2, 50)
  email: string;
}
