import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { Env } from 'src/config/env';

@Injectable()
export class PrismaClientManager implements OnModuleDestroy {
  private databaseUrl: string;

  constructor(private readonly configService: ConfigService<Env, true>) {
    this.databaseUrl = this.configService.get<string>('DATABASE_URL');
  }

  private clients: { [key: string]: PrismaClient } = {};

  public async getClient(tenantId: string): Promise<PrismaClient> {
    let client = this.clients[tenantId];

    if (!client) {
      const url = this.databaseUrl.replace('public', tenantId.toLowerCase());

      client = new PrismaClient({
        datasources: {
          db: {
            url,
          },
        },
      });

      this.clients[tenantId] = client;
    }

    return client;
  }

  async onModuleDestroy(): Promise<void> {
    await Promise.all(
      Object.values(this.clients).map((client) => client.$disconnect()),
    );
  }
}
