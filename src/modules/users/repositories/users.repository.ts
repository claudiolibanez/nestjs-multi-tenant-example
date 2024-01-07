import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  public async findAll() {
    return this.prismaClient.user.findMany();
  }
}
