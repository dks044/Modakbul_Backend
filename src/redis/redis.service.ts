import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
// import * as dotenv from 'dotenv';

// dotenv.config();

@Injectable()
export class RedisService {
  private client: Redis;

  constructor() {
    this.client = new Redis({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD,
    });
  }

  //expirationInSeconds: 만료시간 설정
  async set(key: string, value: string, expirationInSeconds: number) {
    await this.client.set(key, value, 'EX', expirationInSeconds);
  }

  async get(key: string) {
    return await this.client.get(key);
  }
}
