import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const configBuilder = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('API documentation')
    .setDescription('Base')
    .setVersion('1.0')
    .build();

export function initSwagger(app: INestApplication, path?: string) {
    const document = SwaggerModule.createDocument(app, configBuilder);
    SwaggerModule.setup(path || 'api/docs', app, document);
}
