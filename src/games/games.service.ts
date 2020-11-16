import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

import { Repository } from 'typeorm';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Coin } from './entities/coins.entity';
import { Game } from './entities/games.entity';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,

    @InjectRepository(Coin)
    private coinRepository: Repository<Coin>,
  ) {}

  async create(createGameDto: CreateGameDto) {
    const c1 = this.coinRepository.create({
      label: '100uc',
      price: 100,
    });
    const c2 = this.coinRepository.create({
      label: '200uc',
      price: 200,
    });
    const c3 = this.coinRepository.create({
      label: '300uc',
      price: 300,
    });

    const game = await this.gameRepository.insert({
      ...createGameDto,
      coins: [
        {
          label: 'l1',
          price: 500,
        },
      ],
    });

    // if (createGameDto.coins) {
    //   createGameDto.coins.forEach(async (coin) => {
    //     const c = this.coinRepository.create({
    //       label: coin.label,
    //       price: coin.price,
    //     });

    //     const newCoin = await this.coinRepository.save(c);
    //     game.coins.push(newCoin);
    //   });
    // }

    // const coin1 = await this.coinRepository.save(c1);
    // const coin2 = await this.coinRepository.save(c2);
    // const coin3 = await this.coinRepository.save(c3);

    return game;
    // return this.gameRepository.save(game);
  }

  // findAll() {
  //   return this.gameRepository.find();
  // }

  findOne(id: number) {
    return `This action returns a #${id} game`;
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return `This action updates a #${id} game`;
  }

  remove(id: number) {
    return `This action removes a #${id} game`;
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Game>> {
    return paginate<Game>(this.gameRepository, options);
  }
}
