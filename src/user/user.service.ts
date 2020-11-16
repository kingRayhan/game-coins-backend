import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async createUser(body: CreateUserDTO) {
    // TODO: unique error
    const user = new User();
    user.name = body.name;
    user.email = body.email;
    user.password = body.password;
    return this.userRepository.save(user);
  }
  async getUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password'],
    });
  }
  async getUserById(userId) {
    return this.userRepository.findOne({ where: { id: userId } });
  }
}
