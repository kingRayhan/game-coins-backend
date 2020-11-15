import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  BeforeInsert,
} from 'typeorm';
import { hashSync } from 'bcryptjs';

@Entity()
@Unique(['email'])
export class User {
  constructor() {}

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isAdmin?: boolean;

  // @OneToMany(() => Tweet, (tweet) => tweet.user)
  // tweets: Tweet[];

  @BeforeInsert()
  makeMyPasswordHashed() {
    this.password = hashSync(this.password);
  }
}
