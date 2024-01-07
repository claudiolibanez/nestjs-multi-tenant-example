import { FactoryProvider, Scope } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { REQUEST } from '@nestjs/core';

import { PrismaClientManager } from 'src/modules/database/managers/prisma-client.manager';

export interface ContextPayload {
  tenantId: string;
}

export const prismaClientProvider: FactoryProvider<PrismaClient> = {
  provide: PrismaClient,
  scope: Scope.REQUEST,
  durable: true,
  useFactory: (ctxPayload: ContextPayload, manager: PrismaClientManager) => {
    return manager.getClient(ctxPayload.tenantId);
  },
  inject: [REQUEST, PrismaClientManager],
};
