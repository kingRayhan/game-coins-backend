import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GamesService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create(createGameDto: CreateGameDto) {
    const game = await this.prisma.game.create({
      data: {
        title: 'hello',
        slug: 'hello-slug',
        body: 'body',
        coins: {
          create: [
            {
              label: 'label 1',
              price: 100,
            },
          ],
        },
      },
    });

    return game;
    // const c1 = this.coinRepository.create({
    //   label: '100uc',
    //   price: 100,
    // });
    // const c2 = this.coinRepository.create({
    //   label: '200uc',
    //   price: 200,
    // });
    // const c3 = this.coinRepository.create({
    //   label: '300uc',
    //   price: 300,
    // });
    // const game = await this.gameRepository.create({
    //   ...createGameDto,
    // });
    // const coin1 = await this.coinRepository.save(c1);
    // const coin2 = await this.coinRepository.save(c2);
    // const coin3 = await this.coinRepository.save(c3);
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

  // async paginate(options: IPaginationOptions): Promise<Pagination<Game>> {
  //   return paginate<Game>(this.gameRepository, options);
  // }
}
