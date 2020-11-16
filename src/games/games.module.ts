import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/games.entity';
import { Coin } from './entities/coins.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Game, Coin])],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
