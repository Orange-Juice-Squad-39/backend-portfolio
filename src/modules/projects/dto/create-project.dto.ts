import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateProjectDTO {
  @ApiProperty({
    description: 'O título do projeto representa o nome do projeto',
    example: 'Site pizzaria',
  })
  @Length(2, 100)
  title: string;

  @ApiProperty({
    description: 'O link único associado ao projeto ou recurso.',
    example: 'https://github.com/seu-usuario/seu-repositorio',
  })
  @Length(2, 100)
  link: string;

  @Length(2, 50)
  tags: string;

  @ApiProperty({
    description:
      'Uma descrição detalhada do projeto, fornecendo informações sobre seus objetivos, funcionalidades e propósito.',
    example:
      'projeto de um site de uma pizzaria onde os clientes vão fazer o pedido, a cozinha vai começar a preparação e vai para entrega.',
  })
  @Length(2, 500)
  description: string;

  @IsString()
  urlImageProj: string;
}
