import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { getDateNow } from 'src/helpers';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const dateNow = getDateNow();
    return this.usersRepository.save({ ...createUserDto, createdAt: dateNow });
  }

  async countAll(search: string) {
    const param = {
      where: search
        ? [
            { username: Like(`%${search}%`) },
            { email: Like(`%${search}%`) },
            { firstName: Like(`%${search}%`) },
            { lastName: Like(`%${search}%`) },
          ]
        : [],
    };
    const elements = await this.usersRepository.find(param);
    return elements.length;
  }

  findAll(rpp: number, p: number, search: string, sort: string) {
    let param = {};

    if (rpp && p) {
      let order = {};
      order[`${sort}`] = 'ASC';
      // find options
      param = {
        where: search
          ? [
              { username: Like(`%${search}%`) },
              { email: Like(`%${search}%`) },
              { firstName: Like(`%${search}%`) },
              { lastName: Like(`%${search}%`) },
            ]
          : [],
        take: rpp,
        skip: (p - 1) * rpp,
        order: sort ? order : {},
      };
    }

    return this.usersRepository.find(param);
  }

  async findAllWithCount(rpp: number, p: number, search: string, sort: string) {
    // Users rows
    const rows = await this.findAll(+rpp, +p, search, sort);
    // Users count
    const count = await this.countAll(search);
    return {
      rows: rows,
      count: count,
    };
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id: id });
  }

  findOneByUsernameOrEmail(email: string, username: string) {
    return this.usersRepository.findOne({
      where: [
        {
          username: username,
        },
        {
          email: email,
        },
      ],
      relations: {
        cart: true,
      },
    });
  }

  findOneByUsername(username: string) {
    return this.usersRepository.findOne({
      where: {
        username: username,
      },
      relations: {
        cart: true,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update({ id: id }, { ...updateUserDto });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
