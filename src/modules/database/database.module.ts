import { Global, Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { PrismaClientManager } from 'src/modules/database/managers/prisma-client.manager';
import { prismaClientProvider } from 'src/modules/database/providers/prisma-client.provider';

@Global()
@Module({
  providers: [PrismaClientManager, prismaClientProvider],
  exports: [PrismaClient],
})
export class DatabaseModule {}
