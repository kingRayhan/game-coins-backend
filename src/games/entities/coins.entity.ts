import BaseEntity from 'src/shared/entity/BaseEntity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Game } from './games.entity';

@Entity({ name: 'coins' })
export class Coin extends BaseEntity {
  @Column({ type: 'varchar' })
  label: string;

  @Column({ type: 'float' })
  price: number;

  @ManyToOne(() => Game, (game: Game) => game.coins, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  game: Game;
}
