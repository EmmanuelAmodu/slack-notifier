import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

const port = process.env.PORT || 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Slack notification API')
    .setDescription('The notification API description')
    .setVersion('1.0')
    .addTag('webhook')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}

bootstrap().then(() => {
  console.log(`
  Application is running on: http://localhost:${port}
  Swagger UI is running on: http://localhost:${port}/api
  `);
});
