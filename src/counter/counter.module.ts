import { Module } from '@nestjs/common';
import { CounterService } from './counter.service';
import { CounterController } from './counter.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [CounterService],
  controllers: [CounterController],
  imports: [PrismaModule],
})
export class CounterModule {}
