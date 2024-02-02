import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser'

async function main() {
  const port: number = 4444;

  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(cookieParser());


  const config = new DocumentBuilder()
    .setVersion('1.0')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.log(`Server running on http://localhost:${port}`);
}

main();
