import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import slug from 'src/shared/utilities/slug';

import { Coin } from './coins.entity';
import BaseEntity from 'src/shared/entity/BaseEntity';

@Entity({ name: 'games' })
export class Game extends BaseEntity {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar', nullable: true })
  slug: string;

  @Column({ type: 'varchar', nullable: true })
  thumbnail: string;

  @Column({ type: 'varchar', nullable: true })
  cover: string;

  @Column({ type: 'text' })
  body: string;

  @OneToMany(() => Coin, (coin: Coin) => coin.game, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  coins?: Coin[];

  @BeforeInsert()
  makeSlugable() {
    this.slug = slug(this.title) + '-' + Date.now();
  }
}
