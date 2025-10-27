import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { useContainer } from "class-validator";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // // Configure class-validator to use NestJS's DI container
  // useContainer(app.select(AppModule), { fallbackOnErrors: true });
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(process.env.PORT ?? 4000);
}

void bootstrap();
