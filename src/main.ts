import { ContextIdFactory, NestFactory } from '@nestjs/core';

import { AppModule } from 'src/app.module';

import { AggregateByTenantContextIdStrategy } from 'src/common/strategies/aggregate-by-tenant-context-id.strategy';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  ContextIdFactory.apply(new AggregateByTenantContextIdStrategy());

  await app.listen(3000);
}
bootstrap();
