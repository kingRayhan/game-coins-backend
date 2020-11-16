import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { hashSync, compareSync } from 'bcryptjs';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @CreateDateColumn()
  createdAt?: string;

  @UpdateDateColumn()
  updatedAt?: number;

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
