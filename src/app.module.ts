import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { GamesModule } from './games/games.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   url: 'mysql://root@localhost:3306/game-coins',
    //   entities: ['dist/**/*.entity{.ts,.js}'],
    //   synchronize: true,
    //   logging: true,
    // }),
    UserModule,
    AuthModule,
    GamesModule,
    PrismaModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
