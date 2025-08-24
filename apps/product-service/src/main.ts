import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const tcpMicroservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.TCP,
      options: {
        port: 4002,
      },
    });

  const { REDIS_HOST, REDIS_PORT, REDIS_USER, REDIS_PASSWORD } = process.env;

  const redisConfig = {
    host: REDIS_HOST,
    port: REDIS_PORT ? Number(REDIS_PORT) : 15704,
    username: REDIS_USER,
    password: REDIS_PASSWORD,
  };

  Logger.log(
    `Redis host ${redisConfig.host}:${redisConfig.port}`,
    'ProductMicroservice',
  );
  const redisMicroservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.REDIS,
      options: redisConfig,
    });

  await Promise.all([tcpMicroservice.listen(), redisMicroservice.listen()]);

  Logger.log(
    `Orders service running in port ${4002}, listen to redis events`,
    'ProductMicroservice',
  );
}

void bootstrap();
