import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // CORS 활성화
  app.enableCors({
    origin: 'http://localhost:8081', // React Native 앱에서 사용할 로컬 주소
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
