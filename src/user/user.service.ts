import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './user.dto';
//import { User } from './user.entity';

export type Users = any;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findUser(username: string): Promise<Users | undefined> {
    //return this.users.find((user) => user.username === username);
    return this.userRepository.findOneBy({ username: username });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ user_id: id });
  }

  async create(userDto: UserDto): Promise<User> {
    const user: User = {
      user_id: 0,
      username: userDto.username,
      password: userDto.password,
      role: userDto.role,
      firstName: userDto.firstName,
      lastName: userDto.lastName,
      gender: userDto.gender,
      dob: userDto.dob,
      email: userDto.email,
      phone: userDto.phone,
      validatePassword: function (password: string): Promise<boolean> {
        throw new Error('Function not implemented.');
      },
    };
    return this.userRepository.save(user);
  }

  async update(id: number, updateUser: User): Promise<User> {
    await this.userRepository.update(id, updateUser);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
