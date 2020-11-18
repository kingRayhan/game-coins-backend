import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDTO } from 'src/shared/PaginationDTO';
import slug from 'src/shared/utilities/slug';

import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GamesService {
  constructor(private prisma: PrismaService) {}

  async create(createGameDto: CreateGameDto) {
    const game = await this.prisma.game.create({
      data: {
        ...createGameDto,
        slug: slug(createGameDto.title) + '-' + Date.now(),
        coins: {
          create: createGameDto.coins,
        },
      },
      include: { coins: true },
    });

    return {
      message: 'Game created successfully',
      data: game,
    };
  }

  async findAll({ limit = 10, page = 1 }: PaginationDTO) {
    const data = await this.prisma.game.findMany({
      take: +limit,
      skip: +limit * (+page - 1),
      orderBy: {
        createdAt: 'desc',
      },
    });

    const count = await this.prisma.game.count();

    return {
      data,
      meta: {
        totalItems: count,
        itemsPerPage: +limit,
        totalPages: Math.ceil(count / +limit),
        currentPage: +page,
      },
    };
  }

  async findOneBySlug(slug: string) {
    const game = await this.prisma.game.findOne({
      where: { slug },
      include: { coins: true },
    });
    if (!game) throw new NotFoundException();
    return game;
  }

  async findOneByID(id: string) {
    const game = await this.prisma.game.findOne({
      where: { id },
      include: { coins: true },
    });
    if (!game) throw new NotFoundException();
    return game;
  }

  async update(id: string, updateGameDto: UpdateGameDto) {
    await this.prisma.coin.deleteMany({ where: { gameId: id } });

    await this.prisma.game.update({
      where: { id },
      data: {
        ...updateGameDto,
        coins: {
          create: updateGameDto.coins,
        },
      },
    });

    return this.findOneByID(id);
  }

  async remove(id: string) {
    try {
      await this.prisma.coin.deleteMany({ where: { gameId: id } });
      await this.prisma.game.delete({ where: { id } });
      return {
        message: 'Deleted successfully',
      };
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
