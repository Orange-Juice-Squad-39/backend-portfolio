import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({
    description:
      'O nome será utilizado para qualquer coisa (Perfil, Home Page, etc) que precise exibir informações da pessoa conectada',
    example: 'Carlos',
  })
  @Length(2, 15)
  name: string;

  @ApiProperty({
    description:
      'O sobrenome será utilizado para qualquer coisa (Perfil, Home Page, etc) que precise exibir informações da pessoa conectada',
    example: 'Henrique',
  })
  @Length(2, 30)
  lastName: string;

  @ApiProperty({
    description: `É possível conectar com redes sociais sem uma senha, mas para login usando o e-mail diretamente é necessário informar uma senha.`,
    example: 'carlos123@gmail.com',
  })
  @IsEmail()
  @Length(2, 50)
  email: string;

  @Length(8, 20)
  password: string;
}
