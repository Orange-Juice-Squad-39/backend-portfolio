import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function main() {
  const port: number = 4444;

  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(port);
  console.log(`Server running on http://localhost:${port}`);
}

main();
