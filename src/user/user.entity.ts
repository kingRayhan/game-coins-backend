import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  BeforeInsert,
} from 'typeorm';
import { hashSync, compareSync } from 'bcryptjs';

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

  @Column({ select: false })
  password: string;

  @Column({ default: false })
  isAdmin?: boolean;

  // @OneToMany(() => Tweet, (tweet) => tweet.user)
  // tweets: Tweet[];

  @BeforeInsert()
  public makeMyPasswordHashed() {
    this.password = hashSync(this.password);
  }

  /**
   * verify password
   * @param password User password
   */
  public verifyPassword(password: string) {
    return compareSync(password, this.password);
  }
}
